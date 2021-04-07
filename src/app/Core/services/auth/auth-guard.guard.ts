import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthDataService } from './auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  isAuthenticated: boolean;
  constructor(private authDataService:AuthDataService, private router:Router){
    this.authDataService.loginStatus$.subscribe((data)=>this.isAuthenticated = data);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkedLoggedIn();
  }
  checkedLoggedIn():boolean{
    if(this.isAuthenticated)
      return this.isAuthenticated;
    else
      this.router.navigate(['/']);
      return false;
  }
  
}
