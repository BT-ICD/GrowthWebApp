import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDeleteResponse, IRecordsAffectedResponse } from 'src/app/Core/types/common-types';
import { IAttendanceDTOSubmit, IScheduleAdd, IScheduleAddendanceDTOList, IScheduleDetail, IScheduleEdit, IScheduleList } from './ischedule-types';

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
//To get list of students to fill attendance for particualar schedule
attendanceGetList(scheduleId :number):Observable<IScheduleAddendanceDTOList[]>{
  const url:string = this.dataConstantsService.BASEAPIURL +'attendance/GetList/' + scheduleId;
  return this.http.get<IScheduleAddendanceDTOList[]>(url);
}
//To submit attendance of students for particular schedule
submitAttendance(dTOSubmit: IAttendanceDTOSubmit):Observable<IRecordsAffectedResponse>{
  const url:string = this.dataConstantsService.BASEAPIURL + 'attendance/Submit';
  return this.http.post<IRecordsAffectedResponse>(url,dTOSubmit);
}
}
