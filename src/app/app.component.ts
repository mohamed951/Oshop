import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private auth: AuthService,private router: Router,private userS: UserService){
    this.auth.user$.subscribe(user=>{
      if(user){
        userS.save(user);
        let returnUrl = localStorage.getItem('returnUrl') ;
        this.router.navigate([returnUrl]);
      }
    })
  }
}
