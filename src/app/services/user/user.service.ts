import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { AuthService } from '../auth/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../../models/user-model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase,private auth: AuthService) { }

  save(user: firebase.User){
    this.db.object('/users/'+user.uid).update({
      name:user.displayName,
      email:user.email
    })
  }

  get(userId){
    return this.db.object('/users/'+userId).valueChanges();
  }

  getSignedUser(){
    return this.auth.user$.pipe(switchMap((user)=>user?this.get(user.uid):of(null)));
  }

  isAdmin(){
    return this.getSignedUser().pipe(map((user: User) => user?user.isAdmin:false));
  }
}
