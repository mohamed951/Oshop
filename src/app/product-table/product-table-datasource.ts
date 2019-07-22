import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ProductTableItem {
  price: string;
  title: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ProductTableItem[] = [
  {title: 1, price: 'Hydrogen'},
  {title: 2, price: 'Helium'},
  {title: 3, price: 'Lithium'},
  {title: 4, price: 'Beryllium'},
  {title: 5, price: 'Boron'},
  {title: 6, price: 'Carbon'},
  {title: 7, price: 'Nitrogen'},
  {title: 8, price: 'Oxygen'},
  {title: 9, price: 'Fluorine'},
  {title: 10, price: 'Neon'},
  {title: 11, price: 'Sodium'},
  {title: 12, price: 'Magnesium'},
  {title: 13, price: 'Aluminum'},
  {title: 14, price: 'Silicon'},
  {title: 15, price: 'Phosphorus'},
  {title: 16, price: 'Sulfur'},
  {title: 17, price: 'Chlorine'},
  {title: 18, price: 'Argon'},
  {title: 19, price: 'Potassium'},
  {title: 20, price: 'Calcium'},
];

/**
 * Data source for the ProductTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductTableDataSource extends DataSource<ProductTableItem> {
  data: any = [] ;//EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(products) {
    super();
    this.data = products;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ProductTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ProductTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ProductTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'price': return compare(a.price, b.price, isAsc);
        case 'title': return compare(+a.title, +b.title, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example title/price columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
