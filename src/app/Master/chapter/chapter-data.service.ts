import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDeleteResponse } from 'src/app/Core/types/common-types';
import { IChapterDTOAdd, IChapterDTODetail, IChapterDTOList } from './chapter-types';

@Injectable({
  providedIn: 'root'
})
export class ChapterDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getList(subjectId:number):Observable<IChapterDTOList[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Chapter/GetList/' + subjectId;
    return this.http.get<IChapterDTOList[]>(url);
  }
  getById(chapterId:number):Observable<IChapterDTODetail>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'GetById/' + chapterId;
    return this.http.get<IChapterDTODetail>(url);
  }
  getInitializeChapterToAdd():IChapterDTOAdd{
    return {
      chapterSrNo:0,
      name:'',
      subjectId:0,
      notes:''
    }
  }
  addNew(chapterDTOAdd:IChapterDTOAdd):Observable<IChapterDTODetail>{
    const url: string = this.dataConstantsService.BASEAPIURL + 'Chapter/add';
    return this.http.post<IChapterDTODetail>(url,chapterDTOAdd);
  }
  edit(chapterDTODetail:IChapterDTODetail):void{

  }
  delete(chapterId:number){
    const url:string = this.dataConstantsService.BASEAPIURL + 'Chapter/Delete/' + chapterId;
    return this.http.post<IDeleteResponse>(url,null);
  }
}
