import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IQuestionListResolve } from '../iquestion-bank-types';
import { QuestionBankDataService } from '../question-bank-data.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankListResolveService implements Resolve<IQuestionListResolve>{

  constructor(private questionBankDataService:QuestionBankDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IQuestionListResolve | Observable<IQuestionListResolve> | Promise<IQuestionListResolve> {
    let chapterId= +route.paramMap.get('chapterid');
   
    let subjectId= +route.paramMap.get('subjectid');
    let chapterName=route.paramMap.get('chaptername');
    let subjectName=route.paramMap.get('subjectname'); 
    if(isNaN(chapterId)){
      return of({questions:null, chapterId:null,subjectId:null,subjectName:null, chapterName:null, error:'Invalid chapter id, it must be numereic'});
    }
    return this.questionBankDataService.getList(chapterId)
      .pipe(
        map((data)=>({questions:data,chapterId,subjectId,subjectName, chapterName, error:null})),
        catchError((err)=>{
          const message:string = `Error in retrieval {err.statusText}`;
          return of({questions:null,chapterId:null, subjectId:null,subjectName:null, chapterName:null,error:message});
        })
      );
  }
}
