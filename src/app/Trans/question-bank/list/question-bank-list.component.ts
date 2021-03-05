import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IQuestionListDTO, IQuestionListResolve } from '../iquestion-bank-types';

@Component({
  selector: 'app-question-bank-list',
  templateUrl: './question-bank-list.component.html',
  styleUrls: ['./question-bank-list.component.scss','./tabledemo.scss'],
  providers:[MessageService]
})
export class QuestionBankListComponent implements OnInit {
listResolve:IQuestionListResolve;
listResolveSub:Subscription;
questions:IQuestionListDTO[];
selectedQuestion:IQuestionListDTO;
errorMessage:string;
chapterId:number;
chapterName:string;
subjectId:number;
subjectName:string;
cols:any[];  

constructor( private route:ActivatedRoute, private router:Router, private messageService:MessageService) { }

  ngOnInit(): void {
    this.initializeCols();
    this.loadData();
    
  }
  loadData(){
    this.route.data.subscribe((data)=>{
      this.listResolve= data['resolveData'];
      if(this.listResolve.error){
        this.errorMessage = this.listResolve.error;
      }
      this.chapterName = this.listResolve.chapterName;
      this.subjectId = this.listResolve.subjectId;
      this.chapterId= this.listResolve.chapterId;
      this.subjectName = this.listResolve.subjectName;
      this.onQuestionsRetrieved(this.listResolve.questions);

    })
  }
  initializeCols():void{
    this.cols=[
      {field:'questionId',header:'Id'},
      {field:'title',header:'Title'},
      {field:'htmlText',header:'Question'},
      {field:'queTypeId',header:'Type'}

    ]
  }
  onQuestionsRetrieved(data:IQuestionListDTO[]){
    this.questions  = data;
  }
  questionAdd():void{
    this.router.navigate(['/questionbankadd', this.chapterId, this.chapterName, this.subjectId, this.subjectName]);
  }
  deleteRecord():void{

  }
}
