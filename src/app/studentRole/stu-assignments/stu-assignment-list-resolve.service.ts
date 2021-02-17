import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { StuAssignmentDataService } from './stu-assignment-data.service';
import { IMyAssignmentsResolve } from './stu-assignment-types';

@Injectable({
  providedIn: 'root'
})
export class StuAssignmentListResolver implements Resolve<IMyAssignmentsResolve>{

  constructor(private stuAssignmentDataService:StuAssignmentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IMyAssignmentsResolve | Observable<IMyAssignmentsResolve> | Promise<IMyAssignmentsResolve> {
    return this.stuAssignmentDataService.myAssignments()
    .pipe(
      map((data)=>({myAssignments:data ,error:null})),
      catchError((err)=>{
        const message:string =`Error in retrieval ${err.statusText}`;
        return of({myAssignments:null,error:message});
      })
    );
  }
}
