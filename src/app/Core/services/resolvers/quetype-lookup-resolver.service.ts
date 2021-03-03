import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IQueTypeResolver } from '../../types/common-types';
import { LookupValuesService } from '../lookup-values.service';

@Injectable({
  providedIn: 'root'
})
export class QuetypeLookupResolverService implements Resolve<IQueTypeResolver> {

  constructor(private lookupValuesService:LookupValuesService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IQueTypeResolver | Observable<IQueTypeResolver> | Promise<IQueTypeResolver> {
    return this.lookupValuesService.queTypeLookup()
      .pipe(
        map((data)=>({queTypeLookup:data, error:null})),
        catchError((error)=>{
          const message:string =`Retrivel error ${error.statusText}`;
          return of({queTypeLookup:null, error:message});
        })
      )
  }
}
