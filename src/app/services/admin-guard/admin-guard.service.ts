import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../../models/user-model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private userS: UserService,private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.userS.isAdmin();
  }
}
