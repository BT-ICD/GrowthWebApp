/**
 * Learning reference for Validation in HTML for FormArray element 
 * https://www.concretepage.com/angular/angular-formarray-validation
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IQueTypeLookup, IQueTypeResolver } from 'src/app/Core/types/common-types';
import { IQuestionDTOAdd } from '../iquestion-bank-types';
import { QuestionBankDataService } from '../question-bank-data.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit , OnDestroy{
  questionForm:FormGroup;
  queTypeLookup:IQueTypeLookup[];
  chapterId:number;
  chapterName:string;
  subjectId:number;
  subjectName:string;
  queTypeResolver:IQueTypeResolver;
  errorMessage:string;
  routeDataSub:Subscription;
  dataUpdateSub:Subscription
  constructor(private route:ActivatedRoute, private fb:FormBuilder, private router:Router, private questionBankDataService:QuestionBankDataService) { }
 

  ngOnInit(): void {
    this.loadData();
    this.initializeForm();
    
  }
 
  loadData():void{
    this.routeDataSub= this.route.data.subscribe((data)=>{
      this.queTypeResolver= data['resolveData'];
      this.queTypeLookup = this.queTypeResolver.queTypeLookup;
      if(this.queTypeResolver.error){
        this.errorMessage = this.queTypeResolver.error;
      }
    })
    //To initialize chapterId from query string
    this.route.paramMap.subscribe((params)=>{
      this.chapterId = +params.get('chapterid');
      this.chapterName= params.get('chaptername');
      this.subjectId = +params.get('subjectid');
      this.subjectName = params.get('subjectname');
      
    })
   
  }
  initializeForm():void{
    this.questionForm = this.fb.group({
      title:['',Validators.required],
      htmlText:['',Validators.required],
      plainText:[''],
      chapterId:[this.chapterId,Validators.required],
      queTypeId:['',Validators.required],
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
      plainText:[''],
      isCorrect:[false]
    });
    return ansOption;
  }
  addAnswerOptions():void{
    this.answerOptions.push(this.newAnswerOptions());
  }
  onSubmit():void{
    
    if(this.questionForm.valid){
      let dtoAdd:IQuestionDTOAdd = Object.assign(this.questionForm.value);
        this.dataUpdateSub= this.questionBankDataService.add(dtoAdd).subscribe((data)=>{
         if(data.recordsAffected>0){
           this.questionForm.reset();
           this.questionForm.get('chapterId').setValue(this.chapterId);
       
         }
        })
    }
    
  }
  ngOnDestroy(): void {
    if(this.routeDataSub){
      this.routeDataSub.unsubscribe();
    }
    if(this.dataUpdateSub){
      this.dataUpdateSub.unsubscribe();
    }
  }
}
