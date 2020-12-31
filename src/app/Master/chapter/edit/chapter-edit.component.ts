import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubjectLookup, ISubjectLookupResolver } from 'src/app/Core/types/common-types';
import { ChapterDataService } from '../chapter-data.service';
import { IChapterDTODetail, IChapterResolver } from '../chapter-types';

@Component({
  selector: 'app-chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.css']
})
export class ChapterEditComponent implements OnInit {
chapterResolver:IChapterResolver;
chapter:IChapterDTODetail;
errorMessage:String;
subjectLookupResolver:ISubjectLookupResolver;
subjectLookup:ISubjectLookup[];
subjectId:number;
subjectName:string;
chapterForm: FormGroup;

  constructor(private route:ActivatedRoute, private router:Router, private chapterDataService:ChapterDataService, private fb:FormBuilder) { 
    let stateObj = this.router.getCurrentNavigation().extras.state;
    this.subjectId= stateObj.subjectId;
    this.subjectName= stateObj.subjectName;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      this.chapterResolver = data['resolveData'];
     
      if(this.chapterResolver.error){
        this.errorMessage = this.chapterResolver.error;
      }
      this.onChapterRetrieved(this.chapterResolver.chapter);
      this.subjectLookupResolver= data['resolveSubjectList'];
      this.onSubjectLookupRetrieved(this.subjectLookupResolver.subjects);
      if(this.subjectLookupResolver.error){
        this.errorMessage += this.subjectLookupResolver.error;
      }

    })
    
    this.initializeForm();
  }
  onChapterRetrieved(data:IChapterDTODetail):void{
    this.chapter = data;
  }
  onSubjectLookupRetrieved(data:ISubjectLookup[]):void {
    this.subjectLookup= data;
  }
  initializeForm():void{
    this.chapterForm = this.fb.group({
        chapterId: [this.chapter.chapterId, Validators.required],
        chapterSrNo :[this.chapter.chapterSrNo, Validators.required],
        name: [this.chapter.name, Validators.required],
        subjectId: [this.chapter.subjectId, Validators.required],
        notes: [this.chapter.notes]
    })
  }
  onSubmit():void{
    if(this.chapterForm.valid){
      this.chapter = Object.assign(this.chapterForm.value);
      this.chapterDataService.edit(this.chapter).subscribe((data)=>{
          this.router.navigate(['/chapter', this.subjectId, this.subjectName]);                  
      })
    }
  }
}
