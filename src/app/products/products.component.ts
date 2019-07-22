import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { CategoryService } from '../services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UtilsService } from '../services/utils/utils.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  categories$;
  category;
  filteredProducts;
  constructor(private productS: ProductsService,
              private categoryS: CategoryService,
              private route: ActivatedRoute,
              private utilsS: UtilsService)
               {
    
   this.categories$ = categoryS.getAll();
    productS.getAll().pipe(switchMap(products=>{
      this.products=this.utilsS.formatSnapshotObj(products);
      return this.route.queryParamMap;
    }))
    .subscribe(params=>{
      this.category=params.get('category');
      this.filteredProducts= this.category?
      this.products.filter(product=>product.category==this.category):
      this.products;
    })  
   }

  ngOnInit() {
  }

}
