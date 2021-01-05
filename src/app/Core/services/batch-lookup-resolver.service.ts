import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { IBatchLookupResolver } from '../types/common-types';
import { LookupValuesService } from './lookup-values.service';

@Injectable({
  providedIn: 'root'
})
export class BatchLookupResolverService implements Resolve<IBatchLookupResolver> {
  constructor(private lookupValuesService:LookupValuesService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IBatchLookupResolver | Observable<IBatchLookupResolver> | Promise<IBatchLookupResolver> {
    return this.lookupValuesService.batchLookup()
      .pipe(
        map((data)=>({batchList:data, error:null})),
        catchError((error)=>{
          const message:string =`Retrivel error ${error.statusText}`;
          return of({batchList:null, error:message});
        })
      )
  }
}
