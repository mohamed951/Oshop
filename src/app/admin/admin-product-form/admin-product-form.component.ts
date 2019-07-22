import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit ,OnDestroy{
  categories$;
  product={};
  productId;
  constructor(private categoryS: CategoryService,
              private productS: ProductsService,
              private route: ActivatedRoute,
              private router:Router,
              private utilsS: UtilsService) { 
    this.categories$ = this.categoryS.getAll();
    this.productId = this.route.snapshot.paramMap.get('id');
    if(this.productId)
      this.productS.get(this.productId).pipe(take(1))
          .subscribe(product=>this.product=this.utilsS.formatSnapshotObj(product));
  }

  ngOnInit() {

  }
  save(product){
    if(this.productId)
      this.productS.update(this.productId,this.product);
    else this.productS.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(this.productId && confirm("Are you sure you want to delete the product")){
      this.productS.delete(this.productId);
      this.router.navigate(['/admin/products']);
    }
  }
  ngOnDestroy(){
  }


}
