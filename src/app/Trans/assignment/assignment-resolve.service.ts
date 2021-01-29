import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { AssignmentDataService } from './assignment-data.service';

import { IAssignmentResolver } from './assignment-types';

@Injectable({
  providedIn: 'root'
})
export class AssignmentResolveService implements Resolve<IAssignmentResolver> {

  constructor(private assignmentDataService:AssignmentDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IAssignmentResolver | Observable<IAssignmentResolver> | Promise<IAssignmentResolver> {
    let id = +route.paramMap.get('id');
    return this.assignmentDataService.getById(id)
      .pipe(
        map((data)=>({assignment:data,error:null})),
        catchError((err)=>{
          const message:string = `Error in retrieval ${err.statusText}`;
          return of({assignment:null,error:message});
        })
      );
  }
}
