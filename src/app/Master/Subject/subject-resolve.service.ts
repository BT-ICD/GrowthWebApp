import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { SubjectDataService } from './subject-data.service';
import { ISubjectResolver } from './subject-types';

@Injectable({
  providedIn: 'root'
})
export class SubjectResolveService implements Resolve<ISubjectResolver> {

  constructor(private subjectDataService:SubjectDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ISubjectResolver | Observable<ISubjectResolver> | Promise<ISubjectResolver> {
  const id:number = +route.paramMap.get('id');
  return this.subjectDataService.getById(id)
  .pipe(
    map((data)=>({subject:data, error:null})),
    catchError((error)=>{
      const message:string = `Error in retrieval ${error.statusText}`;
      return of({subject:null, error:message});
    })
  );  

  }
}
