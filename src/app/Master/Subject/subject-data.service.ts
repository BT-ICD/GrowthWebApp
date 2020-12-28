import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/data-constants.service';
import { DeleteResponse, ISubjectAdd, ISubjectDetail, ISubjectList } from './subject-types';

@Injectable({
  providedIn: 'root'
})
export class SubjectDataService {

  constructor(private http:HttpClient, private dataConstantsService: DataConstantsService) { }

  getList():Observable<ISubjectList[]>{
    const url:string =  this.dataConstantsService.BASEAPIURL+  'Subject/GetList';
    return this.http.get<ISubjectList[]>(url);
  }
  getById(id:number){
    const url:string = this.dataConstantsService.BASEAPIURL+ 'Subject/GetById/'+ id;
    return this.http.get<ISubjectDetail>(url);
  }
  getInitializeSubjectToadd():ISubjectAdd{
    return { 
      name:'',
      prerequisite:'',
      notes:''
    };
  }
  addNew(subjectAdd: ISubjectAdd):Observable<ISubjectDetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Subject/add';
    return this.http.post<ISubjectDetail>(url,subjectAdd);
  }
  edit(subjectDetail:ISubjectDetail):Observable<ISubjectDetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Subject/edit';
    return this.http.post<ISubjectDetail>(url,subjectDetail);
  }
  delete(id:number):Observable<DeleteResponse>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Subject/delete/' + id;
    return this.http.post<DeleteResponse>(url,null);
  }
}
