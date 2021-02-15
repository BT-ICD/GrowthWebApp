import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { IStudentLookupResolver } from '../../types/common-types';
import { LookupValuesService } from '../lookup-values.service';

@Injectable({
  providedIn: 'root'
})
export class StudentLookupResolverService implements Resolve<IStudentLookupResolver> {

  constructor(private lookupValuesService:LookupValuesService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IStudentLookupResolver | Observable<IStudentLookupResolver> | Promise<IStudentLookupResolver> {
    return this.lookupValuesService.studentLookup()
    .pipe(
      map((data)=>({studentLookup:data, error:null})),
      catchError((err)=>{
        const message:string = `Error in retrievel ${err.statusText}`;
        return of({studentLookup:null,error:message});
      })
    );
  }
}
