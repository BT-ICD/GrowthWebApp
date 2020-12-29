import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { ChapterDataService } from '../chapter-data.service';
import { IChapterDTOList, IChapterListResolver } from '../chapter-types';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css'],
  providers:[MessageService]
})
export class ChapterListComponent implements OnInit {
  chapterListResolver:IChapterListResolver;
  private _chapters: IChapterDTOList[];
  errorMessage:string;
  selectedChapter:IChapterDTOList;
  subjectName:string;
  subjectId:number;
  cols:any[];

  public get chapters(): IChapterDTOList[] {
    return this._chapters;
  }
  public set chapters(value: IChapterDTOList[]) {
    this._chapters = value;
  }
  
  constructor(private route:ActivatedRoute, private router:Router, private chapterDataService:ChapterDataService , private dataConstantsService:DataConstantsService, private messageService:MessageService ) { }

  ngOnInit(): void {
    this.defineColumnsForList();
    this.route.data.subscribe((data=>{
      this.chapterListResolver = data['resolveData'];
      if(this.chapterListResolver.error){
        this.errorMessage = this.chapterListResolver.error;
      }
      this.subjectId = this.chapterListResolver.subjectId;
      this.subjectName = this.chapterListResolver.subjectName;
      this.onChapterListRetrieved(this.chapterListResolver.chapters);
    }));
  }
  defineColumnsForList():void{
    this.cols=[
      {field:'chapterId', header:'Id', display:'none'},
      {field:'chapterSrNo', header:'Sr#', width:'10%'},
      {field:'name', header:'Name', width:'40%'}
    ];
  }
  onChapterListRetrieved(data:IChapterDTOList[]):void{
    this.chapters= data;

  }
  editRecord():void{
    if(!this.selectedChapter){
      alert('None record selected. Please select a record and try again!');
      return ;
    }
    this.router.navigate(['/chapteredit', this.selectedChapter.chapterId]);
    
  }
  deleteRecord():void{
    if(!this.selectedChapter){
      alert('None record selected. Please select a record and try again!');
      return ;
    }
    if(confirm('You are about to delele a record. Are you sure?')){
      this.chapterDataService.delete(this.selectedChapter.chapterId).subscribe((data)=>{
        if(data.rowsAffected===1){
          //To display toast
          this.messageService.add({severity: 'info', summary: 'Record deleted', detail: this.selectedChapter.name});
          //To deleted element from an array
          let index = this.chapters.findIndex(obj=>obj.chapterId === this.selectedChapter.chapterId);
          this.chapters.splice(index,1);
          this.selectedChapter=null;
        }
      });
    }
  }
}
