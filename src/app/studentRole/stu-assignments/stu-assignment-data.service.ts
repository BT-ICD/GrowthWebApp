import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IMyAssignments } from './stu-assignment-types';

@Injectable({
  providedIn: 'root'
})
export class StuAssignmentDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  myAssignments():Observable<IMyAssignments[]>{
    const url:string = this.dataConstantsService.BASEAPIURL +'StudentAssignment/MyAssignments/';
    return this.http.get<IMyAssignments[]>(url);
  }
}
