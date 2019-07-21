import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;
  constructor(private productS: ProductsService) {
    this.products$ = this.productS.getAll();
  }
  
  ngOnInit() {
    
  }

}
