import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 
  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }
  getAll(){
    return this.db.list('/products').snapshotChanges();
  }
  get(productId){
    return this.db.object('/products/'+productId).snapshotChanges();
  } 
  update(productId,product){
    return this.db.object('/products/'+productId).update(product);
  }
  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }
}
