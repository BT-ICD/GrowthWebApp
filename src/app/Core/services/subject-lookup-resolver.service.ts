import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map } from 'rxjs/operators';
import { ISubjectLookupResolver } from '../types/common-types';
import { LookupValuesService } from './lookup-values.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectLookupResolverService implements Resolve<ISubjectLookupResolver> {

  constructor(private lookupValuesService:LookupValuesService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.lookupValuesService.subjectLookup()
      .pipe(
        map((data)=> ({subjects:data, error:null})),
        catchError((error)=>{
          const message:string = `Retrieval error ${error.statusText}`;
          return of({subjects:null, error:message});
        })
      );
  }
}
