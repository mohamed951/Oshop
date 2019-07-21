import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  categories$;
  product = {};
  constructor(private categoryS: CategoryService,
              private productS: ProductsService,
              private route: ActivatedRoute,
              private router:Router) { 

    this.categories$ = this.categoryS.getCategories();
    const productId = this.route.snapshot.paramMap.get('id');
    //need to unsubscribe
    this.productS.get(productId).subscribe(product=>this.product=product);
  }

  ngOnInit() {

  }
  save(product){
    this.productS.create(product);
    this.router.navigate(['/admin/products']);
  }

}
