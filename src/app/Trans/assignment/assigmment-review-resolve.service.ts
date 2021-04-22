import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AssignmentDataService } from './assignment-data.service';
import { IAssignmentReviewResolve } from './assignment-types';

@Injectable({
  providedIn: 'root'
})
export class AssigmmentReviewResolveService implements Resolve<IAssignmentReviewResolve> {

  constructor(private assignmentDataService:AssignmentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IAssignmentReviewResolve | Observable<IAssignmentReviewResolve> | Promise<IAssignmentReviewResolve> {
    const assignmentId= +route.paramMap.get('id');
    return this.assignmentDataService.getReviewList(assignmentId)
      .pipe(
        map((data)=>({assignmentReviewDTOList:data,error:null})),
        catchError((err)=>{
          const message =`Error in retrievel ${err.statusText}`;
          return of({assignmentReviewDTOList:null, error:message});
        })
      );

  }
}
