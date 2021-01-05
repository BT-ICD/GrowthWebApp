import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDeleteResponse } from 'src/app/Core/types/common-types';
import { IScheduleAdd, IScheduleDetail, IScheduleEdit, IScheduleList } from '../ischedule-types';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
getList():Observable<IScheduleList[]>{
  const url:string = this.dataConstantsService.BASEAPIURL +'schedule/getList';
  return this.http.get<IScheduleList[]>(url);
}
getById(scheduleId:number){
  const url: string = this.dataConstantsService.BASEAPIURL + 'schedule/getById/' + scheduleId;
  return this.http.get<IScheduleDetail>(url);
}
addNew(dtoAdd:IScheduleAdd):Observable<IScheduleDetail>{
  const url:string = this.dataConstantsService.BASEAPIURL + 'schedule/add';
  return this.http.post<IScheduleDetail>(url,dtoAdd);
}
edit(dtoEdit:IScheduleEdit):Observable<IScheduleDetail>{
  const url:string = this.dataConstantsService.BASEAPIURL +'schedule/edit';
  return this.http.post<IScheduleDetail>(url,dtoEdit);
}
delete(scheduleId:number):Observable<IDeleteResponse>{
  const url:string = this.dataConstantsService.BASEAPIURL + 'schedule/delete/' + scheduleId;
  return this.http.post<IDeleteResponse> (url,null);
}
}
