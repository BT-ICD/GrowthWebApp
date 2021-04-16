import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StuAssignmentDataService } from './stu-assignment-data.service';
import {  IAssignmentLogResolve } from './stu-assignment-types';

@Injectable({
  providedIn: 'root'
})
export class StuAssignmentLogResolveService implements Resolve<IAssignmentLogResolve> {

  constructor(private stuAssignmentDataService:StuAssignmentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IAssignmentLogResolve | Observable<IAssignmentLogResolve> | Promise<IAssignmentLogResolve> {
    const id = +route.paramMap.get('assignmentAllocationId');
    return this.stuAssignmentDataService.getLog(id).pipe(
      map((data)=>({assignmentLogs:data, error:null})),
      catchError((err)=>{
        const message:string = `Error in retrievel ${err.statusText}`;
        return of({assignmentLogs:null, error:message});
      })
    );
  }
}
