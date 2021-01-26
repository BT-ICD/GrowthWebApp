import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { IAttendanceDTOSubmit, IScheduleAddendanceDTOList } from '../ischedule-types';

@Component({
  selector: 'app-schedule-attendance',
  templateUrl: './schedule-attendance.component.html',
  styleUrls: ['./schedule-attendance.component.css']
})
export class ScheduleAttendanceComponent implements OnInit {

@Input()  displayAttendance: boolean = false;
@Input() addendanceDTOList:IScheduleAddendanceDTOList[];
@Input() scheduleId:number;
@Input() batch:string;
@Input() lectureFrom:Date;

@Output() onDialogShow = new EventEmitter();
@Output() onDialogHide = new EventEmitter();
@Output() onDialogSubmit = new EventEmitter<IAttendanceDTOSubmit>();

  constructor() { }

  ngOnInit(): void {
   
    

   
  }
  onSubmit(){
    let attendanceDTOSubmit:IAttendanceDTOSubmit={
      scheduleId: this.scheduleId,
      students:null
    };

    attendanceDTOSubmit.students = this.addendanceDTOList.map((data)=>{
      return {'studentId':data.studentId, 'status':data.status}
    });
    this.onDialogSubmit.emit(attendanceDTOSubmit);
  }
  
  

  // raise when dialog box open
  onShow(){
    this.onDialogShow.emit();
  }
  // raise when dialog box closed (hide)
  onHide(){
    this.onDialogHide.emit();
  }
}
