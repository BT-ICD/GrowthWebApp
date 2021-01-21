import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDataService } from 'src/app/Core/services/auth/auth-data.service';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IScheduleDTOStudent } from './istu-schedue-types';

@Injectable({
  providedIn: 'root'
})
export class StuScheduleDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService, private authDataService:AuthDataService) { }
  getList(){
    const url:string = this.dataConstantsService.BASEAPIURL +'studentschedule/getList/' + this.authDataService.userName;
    return this.http.get<IScheduleDTOStudent[]>(url);
  }
}
