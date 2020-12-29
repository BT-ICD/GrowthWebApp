import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { ChapterDataService } from '../chapter-data.service';

import { IChapterListResolver } from '../chapter-types';

@Injectable({
  providedIn: 'root'
})
export class ChapterListResolveService implements Resolve<IChapterListResolver> {

  constructor(private chapterDataService:ChapterDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IChapterListResolver | Observable<IChapterListResolver> | Promise<IChapterListResolver> {
    const subjectId:number = +route.paramMap.get('id');
    const subjectName:string = route.paramMap.get('name');
    return this.chapterDataService.getList(subjectId)
    .pipe(
      map((data)=>({chapters:data, subjectId ,subjectName , error:null})),
      catchError((error)=>{
        const message:string = `Retrieval error ${error.statusText}`;
        return of({chapters:null,subjectId:0, subjectName:null, error:message});
      })
    );
  }
}
