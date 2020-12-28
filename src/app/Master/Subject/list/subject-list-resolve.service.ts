import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { SubjectDataService } from '../subject-data.service';
import { SubjectListResolver } from '../subject-types';

@Injectable({
  providedIn: 'root'
})
export class SubjectListResolveService  implements Resolve<SubjectListResolver>{

  constructor(private subjectDataService:SubjectDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SubjectListResolver | Observable<SubjectListResolver> | Promise<SubjectListResolver> {
    return this.subjectDataService.getList()
    .pipe(
      map((data)=>({subjects:data,error:null})),
      catchError((error)=>{
        const message:string = `Retrieval error ${error.statusText}`;
        return of({subjects:null, error:message});
      })
    );
  }
}
