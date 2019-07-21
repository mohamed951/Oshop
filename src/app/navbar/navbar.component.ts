import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user-model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
 {
  //  userSigned$;
    userSigned;
   constructor(private auth: AuthService,private userS: UserService) { 
    // auth.user$.subscribe(user)
    userS.getSignedUser().subscribe(userSigned=>this.userSigned=userSigned);
    // userS.getSignedUser().subscribe((user: User)=>this.userSigned$=user);
    }

  logout(){
    this.auth.logout();
  }

}
