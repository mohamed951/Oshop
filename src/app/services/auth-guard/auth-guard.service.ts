import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService,private router:Router) { 
  }

  canActivate(route,state){
    return this.auth.user$.pipe(map(user=>{
      if(user) return true;
  
      this.router.navigate(['/login'],{ queryParams:{ returnUrl:state.url } } );
      return false;
    }))
    
  } 
}
