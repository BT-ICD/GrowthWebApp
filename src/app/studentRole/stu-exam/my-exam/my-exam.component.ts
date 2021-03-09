import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StuExamDataService } from '../stu-exam-data.service';
import { IAnswerOptions, IExamAnswerDTOUpdate, IExamData, IExamDataResolve, IQuestionAndOptions } from '../stu-exam-types';

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
  currentQuestion:IQuestionAndOptions;
  selectedAnswerId:number=0;
  constructor(private route:ActivatedRoute, private stuExamDataService:StuExamDataService) { }

  ngOnInit(): void {
    this.loadData();
    this.setCurrentQuestion();
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
    console.log(this.selectedAnswerId);
    let objUpdate: IExamAnswerDTOUpdate ={
      examStudentId: this.examData.studentId,
      examQuestionId:this.currentQuestion.questionId,
      answerOptionId:this.selectedAnswerId,
      questionStatus:status
    }
    this.stuExamDataService.submitAnswer(objUpdate).subscribe((data)=>{
      console.log(data);
      this.selectedAnswerId=0;
      this.moveNext();
    })
    
    
  }

}
