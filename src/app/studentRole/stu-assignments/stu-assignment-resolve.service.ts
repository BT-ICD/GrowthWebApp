import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StuAssignmentDataService } from './stu-assignment-data.service';
import { IMyAssignmentResolve } from './stu-assignment-types';

@Injectable({
  providedIn: 'root'
})
export class StuAssignmentResolveService implements Resolve<IMyAssignmentResolve> {

  constructor(private stuAssignmentDataService:StuAssignmentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IMyAssignmentResolve | Observable<IMyAssignmentResolve> | Promise<IMyAssignmentResolve> {
    const id = +route.paramMap.get('assignmentAllocationId');
    return this.stuAssignmentDataService.getById(id).pipe(
      map((data)=>({myAssignment:data, error:null})),
      catchError((err)=>{
        const message:string =`Error in retrieval ${err.statusText}`;
        return of({myAssignment:null, error:message})
      })
    );
  }
}
