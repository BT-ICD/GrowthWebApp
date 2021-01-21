import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { IScheduleDTOStudentListResolver } from '../istu-schedue-types';
import { StuScheduleDataService } from '../stu-schedule-data.service';

@Injectable({
  providedIn: 'root'
})
export class StuScheduleListResolveService implements Resolve<IScheduleDTOStudentListResolver> {

  constructor(private stuScheduleDataService:StuScheduleDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IScheduleDTOStudentListResolver | Observable<IScheduleDTOStudentListResolver> | Promise<IScheduleDTOStudentListResolver> {
   
    return this.stuScheduleDataService.getList()
    .pipe(
      map((data)=>({scheduleList:data, error:null})),
      catchError((error)=>{
        const message:string = `Retrivel error ${error.statusText}`;
        return of({scheduleList:null, error:message});
      })
    )
  }
}
