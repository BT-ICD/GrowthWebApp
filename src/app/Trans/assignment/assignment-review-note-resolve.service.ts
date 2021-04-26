import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AssignmentDataService } from './assignment-data.service';
import { IAssignmenReviewListLogResolve } from './assignment-types';

@Injectable({
  providedIn: 'root'
})
export class AssignmentReviewNoteResolveService implements Resolve<IAssignmenReviewListLogResolve> {

  constructor(private assignmentDataService: AssignmentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IAssignmenReviewListLogResolve | Observable<IAssignmenReviewListLogResolve> | Promise<IAssignmenReviewListLogResolve> {
    const id= +route.paramMap.get('id');
    const status = +route.paramMap.get('status');
    const studentid = + route.paramMap.get('studentid');
    return this.assignmentDataService.getReviewListStudentByStatus(id,status,studentid)
      .pipe(
        map((data)=>({assignmentListStudent:data, error:null})),
        catchError((err)=>{
          const message = `Error in retrievel ${err.statusText}`;
          return of({assignmentListStudent:null, error:message});
        })
      );
  }
  
}
