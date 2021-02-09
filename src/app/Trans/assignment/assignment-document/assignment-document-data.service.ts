import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDeleteResponse } from 'src/app/Core/types/common-types';
import { IAssignmentDocumentDTODetail, IAssignmentDocumentDTOList } from './assignment-document-types';

@Injectable({
  providedIn: 'root'
})
export class AssignmentDocumentDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getList(id:number):Observable<IAssignmentDocumentDTOList[]>{
    const url:string = this.dataConstantsService.BASEAPIURL +'AssignmentDocument/getlist/' + id;
    return this.http.get<IAssignmentDocumentDTOList[]>(url);
  }
  getById(id:number):Observable<IAssignmentDocumentDTODetail>{
    const url:string = this.dataConstantsService.BASEAPIURL +'AssignmentDocument/getbyid/'+id;
    return this.http.get<IAssignmentDocumentDTODetail>(url);
  }
  add(formData:FormData):Observable<IAssignmentDocumentDTODetail>{
    const url:string = this.dataConstantsService.BASEAPIURL +'AssignmentDocument/Add';
    return this.http.post<IAssignmentDocumentDTODetail>(url,formData);
  }
  delete(assignmentDocumentId:number):Observable<IDeleteResponse>{
    const url:string = this.dataConstantsService.BASEAPIURL +'AssignmentDocument/delete/' + assignmentDocumentId;
    return this.http.post<IDeleteResponse>(url,null);
  }
}
