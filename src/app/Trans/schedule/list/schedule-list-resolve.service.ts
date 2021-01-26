import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map } from 'rxjs/operators';

import { IScheduleListResolver } from '../ischedule-types';
import { ScheduleDataService } from '../schedule-data.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleListResolveService implements Resolve<IScheduleListResolver> {

  constructor(private scheduleDataService:ScheduleDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IScheduleListResolver | Observable<IScheduleListResolver> | Promise<IScheduleListResolver> {
    return this.scheduleDataService.getList()
    .pipe(
      map((data)=>({scheduleList:data, error:null})),
      catchError((error)=>{
        const message:string = `Retrivel error ${error.statusText}`;
        return of({scheduleList:null, error:message});
      })
    )
  }
}
