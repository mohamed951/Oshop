import { Component, OnInit, OnDestroy ,Input,Output,EventEmitter} from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductTableComponent } from '../../product-table/product-table.component';
import { map } from 'rxjs/operators';

import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils/utils.service';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  products=[];
  filteredProducts=[];
  subscription: Subscription;
  constructor(private productS: ProductsService,
              private utilsS: UtilsService) {
    const obsProducts = this.productS.getAll()
    .pipe(map(products=> this.utilsS.formatSnapshotObj(products)));
    obsProducts.subscribe(products=>{
      this.products=products
      this.filteredProducts=this.products;
    });  
  }



  ngOnInit() {
  }
  
  ngOnDestroy(){
  }

  
}






