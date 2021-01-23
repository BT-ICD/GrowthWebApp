import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IScheduleDTOStudent } from '../istu-schedue-types';

@Component({
  selector: 'app-stu-schedule-list',
  templateUrl: './stu-schedule-list.component.html',
  styleUrls: ['./tabledemo.scss']
})
export class StuScheduleListComponent implements OnInit {
  scheduleList:IScheduleDTOStudent[];
  selectedSchedule:IScheduleDTOStudent;
  errorMessage:String;
  cols:any[];
  displaySessionInfoDialog:boolean;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      let resolveData = data['resolveData'];
      this.scheduleList = resolveData.scheduleList;
      if(resolveData.error){
        this.errorMessage = resolveData.error;
      }
    });
    this.defineColumnsForList();
  }

  defineColumnsForList():void{
    this.cols =[
      {field:'scheduleId',header:'Id',display:'none' },
      {field:'batchId',header:'batchId', display:'none'},
      {field:'batch',header:'Batch', width:'10%'},
      {field:'subjectId',header:'subjectId', display:'none'},
      {field:'subject',header:'Subject',width:'40%'},
      {field:'lectureFrom',header:'From', width:'20%'},
      {field:'lectureTo',header:'To', width:'20%'}
    ]
  }
  openDetails(schedule:IScheduleDTOStudent){
    console.log(schedule);
    this.selectedSchedule = schedule;
    this.displaySessionInfoDialog =true;
  }
  openComments(scheduleId:number){
    alert('comments of '+ scheduleId);
  }
  closeSessionInfoDialog(){
    this.displaySessionInfoDialog =false;
  }
}
