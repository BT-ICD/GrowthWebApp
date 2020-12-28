import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteResponse, ISubjectAdd, ISubjectDetail, ISubjectList } from './subject-types';

@Injectable({
  providedIn: 'root'
})
export class SubjectDataService {

  constructor(private http:HttpClient) { }

  getList():Observable<ISubjectList[]>{
    const url:string = 'https://localhost:44330/api/Subject/GetList';
    return this.http.get<ISubjectList[]>(url);
  }
  getById(id:number){
    const url:string = 'https://localhost:44330/api/Subject/GetById/'+ id;
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
    const url:string = 'https://localhost:44330/api/Subject/add';
    return this.http.post<ISubjectDetail>(url,subjectAdd);
  }
  edit(subjectDetail:ISubjectDetail):Observable<ISubjectDetail>{
    const url:string = 'https://localhost:44330/api/Subject/edit';
    return this.http.post<ISubjectDetail>(url,subjectDetail);
  }
  delete(id:number):Observable<DeleteResponse>{
    const url:string = 'https://localhost:44330/api/Subject/delete/' + id;
    return this.http.post<DeleteResponse>(url,null);
  }
}
