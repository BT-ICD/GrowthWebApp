import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { IScheduleResolver } from '../ischedule-types';
import { ScheduleDataService } from './schedule-data.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleResolveService implements Resolve<IScheduleResolver> {

  constructor(private scheduleDataService: ScheduleDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IScheduleResolver | Observable<IScheduleResolver> | Promise<IScheduleResolver> {
    let scheduleId = + route.paramMap.get('id');
    return this.scheduleDataService.getById(scheduleId)
      .pipe(
        map((data)=>({schedule:data, error:null})),
        catchError((error)=>{
          const message:string = `Retrivel error ${error.statusText}`;
          return of({schedule:null, error:message});
        })
      );
  }
}
