import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpService } from './http.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private http: HttpService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(Cookie.get('authHash') === undefined || Cookie.get('authHash') === '' || Cookie.get('authHash') === null){
      this.router.navigate(['login']);
      this.http.isLoggedIn.next(false);
      return false;
    } else { 
      return true;
    }
  }
}
