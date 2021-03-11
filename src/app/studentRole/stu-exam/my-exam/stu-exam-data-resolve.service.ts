import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { StuExamDataService } from '../stu-exam-data.service';
import { IExamDataResolve } from '../stu-exam-types';

@Injectable({
  providedIn: 'root'
})
export class StuExamDataResolveService implements Resolve<IExamDataResolve> {

  constructor(private stuExamDataService:StuExamDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IExamDataResolve | Observable<IExamDataResolve> | Promise<IExamDataResolve> {
    let examStudentId =+route.paramMap.get('examStudentId'); 
    let examId = +route.paramMap.get('examid');
    let studentId = +route.paramMap.get('studentid');
    return this.stuExamDataService.getExam(examStudentId, examId, studentId)
    .pipe(
      map((data)=>({examData:data, error:null})),
      catchError((err)=>{
        const message:string = `Error in retrieval ${err.statusText}`;
        return of({examData:null, error:message});
      })
    );
  }
}
