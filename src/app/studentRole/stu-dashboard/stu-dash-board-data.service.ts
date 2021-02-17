import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDataService } from 'src/app/Core/services/auth/auth-data.service';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDashboardDTOStudent, IMyAssign } from './stu-dash-board-types';

@Injectable({
  providedIn: 'root'
})
export class StuDashBoardDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService, private authDataService:AuthDataService) { }
  getStudentBoard():Observable<IDashboardDTOStudent>{
    const url:string = this.dataConstantsService.BASEAPIURL +  'StudentBoard/GetStudentBoard';
    return this.http.get<IDashboardDTOStudent>(url);
  }
  myAssignList():Observable<IMyAssign[]>{
    const url:string = this.dataConstantsService.BASEAPIURL +'StudentAssignment/MyAssignments/';
    return this.http.get<IMyAssign[]>(url);
  }
}
