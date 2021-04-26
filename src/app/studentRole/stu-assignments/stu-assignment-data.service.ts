import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IAssignmentLogDTODetail, IMyAssignments } from './stu-assignment-types';

@Injectable({
  providedIn: 'root'
})
export class StuAssignmentDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  myAssignments():Observable<IMyAssignments[]>{
    const url:string = this.dataConstantsService.BASEAPIURL +'StudentAssignment/MyAssignments/';
    return this.http.get<IMyAssignments[]>(url);
  }
  getById(assignmentAllocationId: number):Observable<IMyAssignments>{
    const url:string = this.dataConstantsService.BASEAPIURL +'StudentAssignment/GetById/' + assignmentAllocationId;
    return this.http.get<IMyAssignments>(url);
  }
  submitAssignment(formData:FormData):Observable<IAssignmentLogDTODetail>{
    const url:string = this.dataConstantsService.BASEAPIURL +'StudentAssignment/SubmitAssignment';
    return this.http.post<IAssignmentLogDTODetail>(url,formData);
  }
  getLog(assignmentAllocationId:number):Observable<IAssignmentLogDTODetail[]>{
    const url:string = this.dataConstantsService.BASEAPIURL +'AssignmentAllocation/LogList/' + assignmentAllocationId;
    return this.http.get<IAssignmentLogDTODetail[]>(url);
  }
 

}
