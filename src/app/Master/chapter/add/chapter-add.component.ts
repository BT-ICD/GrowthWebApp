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
subjectId:number;
subjectName:string;
  constructor ( private route:ActivatedRoute, private router:Router, private chapterDataService:ChapterDataService, private fb:FormBuilder) { 
    let stateObj = this.router.getCurrentNavigation().extras.state;
    this.subjectId = stateObj.subjectId;
    this.subjectName= stateObj.subjectName;
    
  }

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
   
    if(this.chapterForm.valid){
      this.chapterAdd = Object.assign(this.chapterForm.value)
      
      this.chapterDataService.addNew(this.chapterAdd).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['/chapter', this.subjectId,this.subjectName]);
      })
    }
  }
}
