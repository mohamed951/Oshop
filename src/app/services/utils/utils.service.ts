import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


    
  formatSnapshotObj(input){
    if(Array.isArray(input))
      return input.map(product=>{
        const formattedProd = product.payload.val();
        formattedProd.key = product.key;
        return formattedProd;
      })
    else {
      const formattedProd = input.payload.val();
      formattedProd.key = input.key;
      return formattedProd;
    }
  }

}
