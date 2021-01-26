import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDeleteResponse } from 'src/app/Core/types/common-types';
import { IAssignmentDTOAdd, IAssignmentDTODetail, IAssignmentDTOEdit, IAssignmentDTOList } from './assignment-types';

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
    const url:string = this.dataConstantsService.BASEAPIURL + 'Assignment/add';
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
}
