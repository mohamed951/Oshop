import { AfterViewInit, Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import {  ProductTableItem } from './product-table-datasource';
import { Product } from '../models/product'
@Component({
  selector: 'product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Product>;
  @Input() products :any[];
  // @Input() filter :string;
  dataSource: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns titles can be added, removed, or reordered. */
  displayedColumns = ['title', 'price','imageUrl'];
  
  constructor(private changeDetectorRefs: ChangeDetectorRef){

  }
  ngOnInit() {
    this.dataSource= new MatTableDataSource(this.products);
  }

  filter(query){
    this.dataSource.filter=query.trim().toLowerCase();;
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
