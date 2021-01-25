import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDashboardDTOStudent } from './stu-dash-board-types';

@Injectable({
  providedIn: 'root'
})
export class StuDashBoardDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getStudentBoard():Observable<IDashboardDTOStudent>{
    const url:string = this.dataConstantsService.BASEAPIURL +  'StudentBoard/GetStudentBoard';
    return this.http.get<IDashboardDTOStudent>(url);
  }
}
