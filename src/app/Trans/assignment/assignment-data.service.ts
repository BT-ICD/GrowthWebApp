import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDeleteResponse, IRecordsAffectedResponse } from 'src/app/Core/types/common-types';
import { IAssignmentAllocationDTOAdd, IAssignmentDTOAdd, IAssignmentDTODetail, IAssignmentDTOEdit, IAssignmentDTOList, IAssignmentLogDTOReviewListStudent, IAssignmentReviewDTOList } from './assignment-types';

@Injectable({
  providedIn: 'root'
})
export class AssignmentDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getList():Observable<IAssignmentDTOList[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Assignment/GetList';
    return this.http.get<IAssignmentDTOList[]>(url);
  }
  getById(assignmentId:number):Observable<IAssignmentDTODetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Assignment/GetById/' + assignmentId;
    return this.http.get<IAssignmentDTODetail>(url);
  }
  addnew(dtoAdd:IAssignmentDTOAdd):Observable<IAssignmentDTODetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Assignment/Add';
    return this.http.post<IAssignmentDTODetail>(url,dtoAdd);
  }
  edit(dtoEdit:IAssignmentDTOEdit):Observable<IAssignmentDTODetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Assignment/edit';
    return this.http.post<IAssignmentDTODetail>(url,dtoEdit);
  }
  delete(assignmentId:number):Observable<IDeleteResponse>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Assignment/delete/' + assignmentId;
    return this.http.post<IDeleteResponse>(url,null);
  }
  allocatedAssignment(data:IAssignmentAllocationDTOAdd){
    const url:string = this.dataConstantsService.BASEAPIURL + 'AssignmentAllocation/Add';
    return this.http.post<IRecordsAffectedResponse>(url,data);
    
  }
  getReviewList(assignmentId:number):Observable<IAssignmentReviewDTOList>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Assignment/ReviewList/' + assignmentId;
    return this.http.get<IAssignmentReviewDTOList>(url);
  }
  getReviewListStudentByStatus(assignmentId:number, status:number):Observable<IAssignmentLogDTOReviewListStudent[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'AssignmentAllocation/ReviewListStudentByStatus/' + assignmentId +'/' + status;
    console.log(url);
    return this.http.get<IAssignmentLogDTOReviewListStudent[]>(url);
  }
}
