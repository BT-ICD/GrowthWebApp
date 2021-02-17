import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { StuDashBoardDataService } from './stu-dash-board-data.service';
import { IMyAssignResolve } from './stu-dash-board-types';

@Injectable({
  providedIn: 'root'
})
export class MyTaskResolveService implements Resolve<IMyAssignResolve> {

  constructor(private stuDashBoardDataService:StuDashBoardDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IMyAssignResolve | Observable<IMyAssignResolve> | Promise<IMyAssignResolve> {
    return this.stuDashBoardDataService.myAssignList()
    .pipe(
      map((data)=>({assignments:data ,error:null})),
      catchError((err)=>{
        const message:string =`Error in retrieval ${err.statusText}`;
        return of({assignments:null,error:message});
      })
    );
  }
}
