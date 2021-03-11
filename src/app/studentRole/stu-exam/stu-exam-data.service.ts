import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDataUpdateResponseDTO } from 'src/app/Core/types/common-types';
import { IExamAnswerDTOUpdate, IExamData } from './stu-exam-types';

@Injectable({
  providedIn: 'root'
})
export class StuExamDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getExam(examStudentId:number, examId:number, studentId:number):Observable<IExamData>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'StudentExam/GetExam/' + examStudentId +"/"+  examId+ '/' + studentId;
    return this.http.get<IExamData>(url);
  }
  submitAnswer(dtoUpdate:IExamAnswerDTOUpdate):Observable<IExamAnswerDTOUpdate>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'StudentExam/SubmitAnswer';
    return this.http.post<IExamAnswerDTOUpdate>(url,dtoUpdate);
  }
  finishExam(examStudentId:number,  examId:number, studentId:number):Observable<IDataUpdateResponseDTO>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'StudentExam/FinishExam/' + examStudentId +"/" + examId+"/" + studentId;
    return this.http.post<IDataUpdateResponseDTO>(url,null);
  }
  startExam(examId:number, studentId:number):Observable<IDataUpdateResponseDTO>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'StudentExam/StartExam/' +  examId+"/" + studentId;
    return this.http.post<IDataUpdateResponseDTO>(url,null);
  }
}
