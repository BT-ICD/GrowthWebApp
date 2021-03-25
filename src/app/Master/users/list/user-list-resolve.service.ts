import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { AppUserDataService } from '../app-user-data.service';
import { IAppUserListResolve } from '../iuser-types';

@Injectable({
  providedIn: 'root'
})
export class UserListResolveService implements Resolve<IAppUserListResolve> {

  constructor(private appUserDataService:AppUserDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IAppUserListResolve | Observable<IAppUserListResolve> | Promise<IAppUserListResolve> {
    return this.appUserDataService.getList()
      .pipe(
        map((data)=> ({users:data, error:null})),
        catchError((err)=>{
          const message:string =`Error in retrievel ${err.statusText}`;
          return of({users:null, error:message});
        })
      )
  }
}
