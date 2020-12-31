import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { ChapterDataService } from './chapter-data.service';

import { IChapterResolver } from './chapter-types';

@Injectable({
  providedIn: 'root'
})
export class ChapterResolveService implements Resolve<IChapterResolver> {

  constructor(private chapterDataService: ChapterDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IChapterResolver | Observable<IChapterResolver> | Promise<IChapterResolver> {
    const chapterId: number = +route.paramMap.get('id');
    return this.chapterDataService.getById(chapterId)
    .pipe(
      map((data)=>({chapter:data, error:null})),
      catchError((error)=>{
        const message:string = `Error in retrieval ${error.statusText}`;
        return of({chapter:null, error:message});
      })
    );
  }
}
