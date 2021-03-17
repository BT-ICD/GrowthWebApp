import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDataUpdateResponseDTO } from 'src/app/Core/types/common-types';
import { IExamDTOAdd, IExamDTOList } from './iexam-admin-types';

@Injectable({
  providedIn: 'root'
})
export class ExamAdminDataService {

  constructor(private http:HttpClient, private route:ActivatedRoute, private router:Router, private dataConstantsService:DataConstantsService) { }
  getList(subjectId:number|null):Observable<IExamDTOList[]>{
    let url:string = this.dataConstantsService.BASEAPIURL + 'ExamAdmin/GetList';
    if(subjectId){
      url += '/' + subjectId;
    }
    return this.http.get<IExamDTOList[]>(url);
  }
  add(dtoAdd:IExamDTOAdd):Observable<IDataUpdateResponseDTO>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'ExamAdmin/add';
    return this.http.post<IDataUpdateResponseDTO>(url,dtoAdd);
  }
}
