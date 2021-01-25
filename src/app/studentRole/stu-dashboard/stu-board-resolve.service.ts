import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { StuDashBoardDataService } from './stu-dash-board-data.service';

import { IDashboardDTOStudentResolve } from './stu-dash-board-types';

@Injectable({
  providedIn: 'root'
})
export class StuBoardResolveService implements Resolve<IDashboardDTOStudentResolve>{

  constructor(private stuDashBoardDataService:StuDashBoardDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IDashboardDTOStudentResolve | Observable<IDashboardDTOStudentResolve> | Promise<IDashboardDTOStudentResolve> {
    return this.stuDashBoardDataService.getStudentBoard()
    .pipe(
      map((data)=>({dashboardDTOStudent:data,error:null})),
      catchError((error)=>{
        const message:string = `Error in retrievel ${error.statusText}`;
        return of({dashboardDTOStudent:null,error:message});
      })
    );
  }
}
