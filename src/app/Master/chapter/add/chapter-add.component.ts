import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubjectLookup, ISubjectLookupResolver } from 'src/app/Core/types/common-types';
import { ChapterDataService } from '../chapter-data.service';
import { IChapterDTOAdd } from '../chapter-types';

@Component({
  selector: 'app-chapter-add',
  templateUrl: './chapter-add.component.html',
  styleUrls: ['./chapter-add.component.css']
})
export class ChapterAddComponent implements OnInit {
chapterAdd:IChapterDTOAdd;
errorMessage:string;
chapterForm:FormGroup;
subjectLookup:ISubjectLookup[];
subjectLookupResolver:ISubjectLookupResolver;
selectedSubject:ISubjectLookup;
  constructor ( private route:ActivatedRoute, private router:Router, private chapterDataService:ChapterDataService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      this.subjectLookupResolver = data['resolveData'];
      if(this.subjectLookupResolver.error)
        this.errorMessage= this.subjectLookupResolver.error;
      this.onSubjectLookupRetrieved(this.subjectLookupResolver.subjects);
    })
    this.initializeForm();
  }
  onSubjectLookupRetrieved(data:ISubjectLookup[]){
    this.subjectLookup = data;
    
  }
  initializeForm():void{
    this.chapterForm = this.fb.group({
      chapterSrNo:[0,Validators.required],
      name:['',Validators.required],
      subjectId:[null,Validators.required],
      notes:['']
    })
  }
  onSubmit():void{
    console.log(this.chapterForm.valid);
    console.log(this.chapterForm.value);
    if(this.chapterForm.valid){
      this.chapterAdd = Object.assign(this.chapterForm.value)
      console.log(this.chapterAdd);
      this.chapterDataService.addNew(this.chapterAdd).subscribe((data)=>{
        console.log(data);
      })
    }
  }
}
