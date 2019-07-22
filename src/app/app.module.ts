import { environment } from './../environments/environment'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms'
import { CustomFormsModule } from 'ng2-validation'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AdminGuardService } from './services/admin-guard/admin-guard.service';
import { CategoryService } from './services/category/category.service';
import { ProductsService } from './services/products/products.service';
import { ProductTableComponent } from './product-table/product-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductCardComponent } from './product-card/product-card.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    OrderSuccessComponent,
    CheckoutComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    AdminProductFormComponent,
    ProductTableComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path:'', component: ProductsComponent },
      { path:'login', component: LoginComponent },
      { path:'products', component: ProductsComponent },
      { path:'shopping-cart', component: ShoppingCartComponent },

      { path:'checkout', component: CheckoutComponent, canActivate:[ AuthGuardService ]},
      { path:'order-success', component: OrderSuccessComponent, canActivate:[ AuthGuardService ] },
      { path:'my/orders', component: MyOrdersComponent, canActivate:[ AuthGuardService ] },

      { path:'admin/products', component: AdminProductsComponent, canActivate:[ AuthGuardService, AdminGuardService ] },
      { path:'admin/products/:id', component: AdminProductFormComponent, canActivate:[ AuthGuardService , AdminGuardService  ] },
      { path:'admin/orders/new', component: AdminProductFormComponent, canActivate:[ AuthGuardService , AdminGuardService  ] },
      { path:'admin/orders', component: AdminOrdersComponent, canActivate:[ AuthGuardService , AdminGuardService  ] },
      
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminGuardService,
    CategoryService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
