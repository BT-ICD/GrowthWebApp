import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IQueTypeLookup, IQueTypeResolver } from 'src/app/Core/types/common-types';
import { IQuestionDTOAdd } from '../iquestion-bank-types';
import { QuestionBankDataService } from '../question-bank-data.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
  questionForm:FormGroup;
  queTypeLookup:IQueTypeLookup[];
  chapterId:number;
  chapterName:string;
  queTypeResolver:IQueTypeResolver;
  errorMessage:string;
  constructor(private route:ActivatedRoute, private fb:FormBuilder, private router:Router, private questionBankDataService:QuestionBankDataService) { }

  ngOnInit(): void {
    this.loadData();
    this.initializeForm();
    
  }
  onSubmit():void{
    console.log(this.questionForm.valid);
    console.log(this.questionForm.value);
    let dtoAdd:IQuestionDTOAdd = Object.assign(this.questionForm.value);
    console.log(dtoAdd);
    if(this.questionForm.valid){
      this.questionBankDataService.add(dtoAdd).subscribe((data)=>{
       if(data.recordsAffected>0){
         alert('Question Created');
         this.questionForm.reset();
       }
      })
    }
  }
  loadData():void{
    this.route.data.subscribe((data)=>{
      this.queTypeResolver= data['resolveData'];
      this.queTypeLookup = this.queTypeResolver.queTypeLookup;
      if(this.queTypeResolver.error){
        this.errorMessage = this.queTypeResolver.error;
      }
    })
    //To initialize chapterId from query string
    this.route.paramMap.subscribe((params)=>{
      this.chapterId = +params.get('chapterid');
    })
   
  }
  initializeForm():void{
    this.questionForm = this.fb.group({
      title:['',Validators.required],
      htmlText:['',Validators.required],
      plainText:[''],
      chapterId:[this.chapterId,Validators.required],
      queTypeId:[0,Validators.required],
      notes:[''],
      answerOptions:this.fb.array([this.newAnswerOptions()])
    });
  }
  get answerOptions(){
    return this.questionForm.get('answerOptions') as FormArray;
  }
  newAnswerOptions():FormGroup{
    let ansOption = this.fb.group({
      htmlText:['',Validators.required],
      plainText:['']
    });
    return ansOption;
  }
  addAnswerOptions():void{
    this.answerOptions.push(this.newAnswerOptions());
  }
}
