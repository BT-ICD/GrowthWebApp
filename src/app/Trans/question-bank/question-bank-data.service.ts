import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IRecordsAffectedResponse } from 'src/app/Core/types/common-types';
import { IQuestionDTOAdd, IQuestionListDTO } from './iquestion-bank-types';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService ){ }
  getList(subjectid:number,chapterId?:number):Observable<IQuestionListDTO[]>{

    let url:string = this.dataConstantsService.BASEAPIURL +'QuestionBank/GetList/'+ subjectid;
    if(chapterId){
      url+= "/" + chapterId;
    }
    return this.http.get<IQuestionListDTO[]>(url);
  }
  add(dtoAdd:IQuestionDTOAdd):Observable<IRecordsAffectedResponse>{
    const url:string = this.dataConstantsService.BASEAPIURL +'QuestionBank/add';
    return this.http.post<IRecordsAffectedResponse>(url,dtoAdd);
  }
}
