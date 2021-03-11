import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StuExamDataService } from '../stu-exam-data.service';

@Component({
  selector: 'app-my-exam-start',
  templateUrl: './my-exam-start.component.html',
  styleUrls: ['./my-exam-start.component.scss']
})
export class MyExamStartComponent implements OnInit {
  examId:number;
  studentId:number;
  constructor(private router:Router, private stuExamDataService:StuExamDataService) { }

  ngOnInit(): void {
  }
  startExam():void{
    this.stuExamDataService.startExam(this.examId, this.studentId).subscribe((data)=>{
        if(data.status.toUpperCase()=="PASS"){
          this.router.navigate(['/myexam', data.recordCount, this.examId,this.studentId]);
        }
        else
        {
          alert('Not able to start exam');
        }
    });
  }
}
