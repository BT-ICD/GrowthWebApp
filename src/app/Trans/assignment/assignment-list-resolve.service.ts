import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { AssignmentDataService } from './assignment-data.service';

import { IAssignmentListResolver } from './assignment-types';

@Injectable({
  providedIn: 'root'
})
export class AssignmentListResolveService implements Resolve<IAssignmentListResolver>{

  constructor(private assignmentDataService:AssignmentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IAssignmentListResolver | Observable<IAssignmentListResolver> | Promise<IAssignmentListResolver> {
    return this.assignmentDataService.getList()
    .pipe(
      map((data)=>({assignmentList:data,error:null})),
      catchError((err)=>{
        const message:string = `Error in retrieval ${err.statusText}`;
        return of({assignmentList:null, error:message});
      })
    );
  }
}
