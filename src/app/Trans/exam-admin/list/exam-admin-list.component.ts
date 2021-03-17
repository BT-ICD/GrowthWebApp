import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExamAdminDataService } from '../exam-admin-data.service';
import { IExamDTOList } from '../iexam-admin-types';

@Component({
  selector: 'app-exam-admin-list',
  templateUrl: './exam-admin-list.component.html',
  styleUrls: ['./exam-admin-list.component.scss','./tabledemo.scss'],
  providers:[MessageService]
})
export class ExamAdminListComponent implements OnInit {
  examList:IExamDTOList[];
  selectedExam:IExamDTOList;
  errorMessage:string;
  cols:any[];
  constructor(private examAdminDataService:ExamAdminDataService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.loadData();
    this.initializeColumns();
  }
  loadData():void{
     this.examAdminDataService.getList(null).subscribe((data)=>{
      console.log(data);
      this.examList=data;
    })
  }
  initializeColumns():void{
    this.cols=[
      {field:'examId',header:'Id', width:'07%'},
      {field:'subjectId',header:'Description',display:'none'},
      {field:'subjectName',header:'Subject', width:'40%'},
      {field:'totalQuestions',header:'Total', width:'10%'}

    ];
  }

}
