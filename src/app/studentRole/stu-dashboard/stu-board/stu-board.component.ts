import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDashboardDTOStudent, IDashboardDTOStudentResolve } from '../stu-dash-board-types';

@Component({
  selector: 'app-stu-board',
  templateUrl: './stu-board.component.html',
  styleUrls: ['./stu-board.component.css']
})
export class StuBoardComponent implements OnInit {
  dashboardDTOStudentResolve:IDashboardDTOStudentResolve;
  dashboardDTOStudent:IDashboardDTOStudent;
  attended:number;
  missed:number;
  totalSessions:number;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      this.dashboardDTOStudentResolve = data['resolveData'];
      
      this.dashboardDTOStudent = this.dashboardDTOStudentResolve.dashboardDTOStudent;
      if(this.dashboardDTOStudent.sessionSummary.length==3){
        let result = this.dashboardDTOStudent.sessionSummary.filter(obj=>obj.sessionType=='Attended');
        this.attended = result[0].numberOfSessions;

        result = this.dashboardDTOStudent.sessionSummary.filter(obj=>obj.sessionType=='Missed');
        this.missed = result[0].numberOfSessions;

        result = this.dashboardDTOStudent.sessionSummary.filter(obj=>obj.sessionType=='TotalSessions');
        this.totalSessions = result[0].numberOfSessions;

      }
    });
  }

}
