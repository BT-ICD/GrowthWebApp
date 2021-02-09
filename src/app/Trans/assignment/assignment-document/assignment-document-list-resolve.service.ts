import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { AssignmentDocumentDataService } from './assignment-document-data.service';
import { IAssignmentDocumentListResolve } from './assignment-document-types';

@Injectable({
  providedIn: 'root'
})
export class AssignmentDocumentListResolveService implements Resolve<IAssignmentDocumentListResolve> {

  constructor(private assignmentDocumentDataService:AssignmentDocumentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IAssignmentDocumentListResolve | Observable<IAssignmentDocumentListResolve> | Promise<IAssignmentDocumentListResolve> {
    let id = +route.paramMap.get('id');
    let queTitle= route.paramMap.get('queTitle');
    let subjectName = route.paramMap.get('subjectName');
    return this.assignmentDocumentDataService.getList(id)
    .pipe(
      map((data)=>({assignmentDocList:data,assignmentId:id,queTitle:queTitle,subjectName:subjectName,  error:null})),
      catchError((err)=>{
        const message:string = `Retrivel error: ${err.statusText}`;
        return of({assignmentDocList:null, assignmentId:0,queTitle:'',subjectName:'', error:message});
      })
    )
  }
}
