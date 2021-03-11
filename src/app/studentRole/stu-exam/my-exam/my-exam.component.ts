import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StuExamDataService } from '../stu-exam-data.service';
import {  IExamAnswerDTOUpdate, IExamData, IExamDataResolve, IQuestionAndOptions } from '../stu-exam-types';

@Component({
  selector: 'app-my-exam',
  templateUrl: './my-exam.component.html',
  styleUrls: ['./my-exam.component.scss']
})
export class MyExamComponent implements OnInit {
  examDataResolve: IExamDataResolve;
  questions:IQuestionAndOptions[];
  examData:IExamData;
  errorMessage:string;
  position:number=0;
  totalQuestions:number=0;
  skippedQuestions:number=0;
  attemptedQuestions:number=0;
  currentQuestion:IQuestionAndOptions;
  selectedAnswerId:number=0;
  constructor(private route:ActivatedRoute, private stuExamDataService:StuExamDataService) { }

  ngOnInit(): void {
    this.loadData();
    this.setCurrentQuestion();
    this.updateSummary();
  }

  loadData():void{
    this.route.data.subscribe((data)=>{
      this.examDataResolve = data['resolveData'];
      this.examData = this.examDataResolve.examData;
      this.questions= this.examData.questions;
      this.totalQuestions = this.questions.length;
      if(this.examDataResolve.error){
        this.errorMessage = this.examDataResolve.error;
      }
    })
  }

  setCurrentQuestion(){
    if(this.questions){
    this.currentQuestion = this.questions[this.position];
    // console.log(this.currentQuestion);
    if(!this.currentQuestion.answerOptionId){
      this.selectedAnswerId=0;
    }
    else{
      this.selectedAnswerId = this.currentQuestion.answerOptionId;
    }
    
  }
  }
  moveFirst():void{
    this.position=0;
    this.setCurrentQuestion();
  }
  movePrevious():void{
    if(this.position>0){
      this.position--;
      this.setCurrentQuestion();
    }
  }
  moveNext():void{
    if(this.position<(this.totalQuestions-1)){
      this.position++;
      this.setCurrentQuestion();
    }
  }
  moveLast():void{
    this.position= this.totalQuestions-1;
    this.setCurrentQuestion();
  }
  submitAnswer(status:number):void{
    if(status==1){
      if(this.selectedAnswerId<=0 ){
        alert('None selected');
        return;
        }
    }
    else if (status==2){
      this.selectedAnswerId=0;
    }
    // console.log(this.selectedAnswerId);
    let objUpdate: IExamAnswerDTOUpdate ={
      examStudentId: this.examData.examStudentId,
      examQuestionId:this.currentQuestion.questionId,
      answerOptionId:this.selectedAnswerId,
      questionStatus:status
    }
    this.stuExamDataService.submitAnswer(objUpdate).subscribe((data)=>{
      // console.log(data);
      let result : IExamAnswerDTOUpdate;
      result= data;
      if(!result){
          alert('OOPS ... some thing went wrong. Please contact administrator');
          return;
      } 
      if(result.examQuestionId!=objUpdate.examQuestionId){
        alert('OOPS ... some thing went wrong. Please contact administrator');
        return;
      }
      //Update submitted answer response
      this.questions[this.position].questionStatus= result.questionStatus;
      this.questions[this.position].answerOptionId = result.answerOptionId;
      //clear current anwer and move to next question
      //this.selectedAnswerId=0;
      this.moveNext();
      //Update Summary Data
      this.updateSummary();
    })
    
  }
  updateSummary():void{
    this.skippedQuestions  = this.questions.filter(obj=>obj.questionStatus===2).length;
    this.attemptedQuestions  = this.questions.filter(obj=>obj.questionStatus===1).length;

  }
  finishExam():void{
    if(confirm('You are about to complete exam. Are you sure?')){
      this.stuExamDataService.finishExam(this.examData.examStudentId, this.examData.examId, this.examData.studentId).subscribe(
        (data)=>{
          if(data.status.toUpperCase()=="PASS"){
            alert('exam completed');
          }
          else{
            alert('Not able to mark as to finish exam');
          }
      });
    }
  }
}
