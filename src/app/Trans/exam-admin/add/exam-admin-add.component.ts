import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LookupValuesService } from 'src/app/Core/services/lookup-values.service';
import { IQuestions, ISubjectLookup, ISubjectLookupResolver } from 'src/app/Core/types/common-types';
import { ExamAdminDataService } from '../exam-admin-data.service';
import { IExamDTOAdd } from '../iexam-admin-types';

@Component({
  selector: 'app-exam-admin-add',
  templateUrl: './exam-admin-add.component.html',
  styleUrls: ['./exam-admin-add.component.scss','./tabledemo.scss'],
  providers:[MessageService]
})
export class ExamAdminAddComponent implements OnInit, OnDestroy {
  subjectLookupResolver:ISubjectLookupResolver;
  subjects:ISubjectLookup[];
  questions:IQuestions[];
  examForm:FormGroup;
  selectedQuestions:IQuestions[];
  errorMessage:string;
  cols:any[];
  submitSub:Subscription;
  resolveDataSub:Subscription;
  constructor(private route:ActivatedRoute,private router:Router,private fb:FormBuilder, private lookupValuesService:LookupValuesService, private examAdminDataService:ExamAdminDataService, private messageService: MessageService) { }
  ngOnDestroy(): void {
    if(this.submitSub){
      this.submitSub.unsubscribe();
    }
    if(this.resolveDataSub){
      this.resolveDataSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadData();
    this.initializeForm();
    this.initializeColumns();
    this.getQuestions();
  }
  loadData():void{
    this.resolveDataSub= this.route.data.subscribe((data)=>{
      this.subjectLookupResolver= data['resolveSubjects'];
      this.subjects  = this.subjectLookupResolver.subjects;
    })
  }
  initializeColumns():void{
    this.cols=[
      {field:'questionId',header:'Id', width:'07%'},
      {field:'title',header:'Description',width:'60%'},
      {field:'queTypeId',header:'Type', width:'10%'}
    ];
  }
  initializeForm():void{
    this.examForm = this.fb.group({
      subjectId:[null,Validators.required],
      totalQuestions:[null,Validators.required],
      notes:[null,Validators.required],
      questionIds:[null,Validators.required]
    })
  }
  getQuestions():void{
    this.lookupValuesService.getQuestions(1,null).subscribe((data)=>{
      this.questions=data;
    })
    
  }
  onSubmit():void{
    
    if(!this.selectedQuestions){
      alert('No questions selected. Select questions for this exam and try again');
    }
    let dtoAdd:IExamDTOAdd;
    
    dtoAdd = Object.assign(this.examForm.value);
    let que = this.getCSV(this.selectedQuestions)
   
    dtoAdd.questionIds= this.getCSV(this.selectedQuestions);
    if(dtoAdd.totalQuestions!=this.selectedQuestions.length){
      alert('No of questions and selected questions are not same. Number of questions defined ' + dtoAdd.totalQuestions + ' Number of questions selected: ' + this.selectedQuestions.length);
      return;
    }
    //Submit to database
    
    this.submitSub= this.examAdminDataService.add(dtoAdd).subscribe((data)=>{
      console.log(data);
      if(data.status.toUpperCase()=="PASS"){
        this.messageService.add({severity:'success', summary:'Exam created', detail:data.description});
      }
      else{
        this.messageService.add({severity:'error', summary:'Failed to create exam', detail:data.description});
      }
      this.router.navigate(['/examadminlist']);
    });
    
  }
  //Function to get comma separated question ids from selected questions
  getCSV(questionArr:IQuestions[]):string{
    let result :string="";
    if (!questionArr ){
      return ""
    }
    if(questionArr.length==0){
      return "";
    }
    
    questionArr.forEach((obj)=>{
      result += "," + obj.questionId;
    })
    result =result.substring(1);
    return result;
  }
  
}
