import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssignmentViewComponent } from 'src/app/Shared/partialcomponents/assignment-view/assignment-view.component';
import { IDashboardDTOStudent, IDashboardDTOStudentResolve, IMyAssign, IMyAssignResolve } from '../stu-dash-board-types';

@Component({
  selector: 'app-stu-board',
  templateUrl: './stu-board.component.html',
  styleUrls: ['./stu-board.component.css']
})
export class StuBoardComponent implements OnInit, OnDestroy {
  dashboardDTOStudentResolve: IDashboardDTOStudentResolve;
  dashboardDTOStudent: IDashboardDTOStudent;
  attended: number;
  missed: number;
  totalSessions: number;
  assignmentList: IMyAssign[];
  errorMessage: string;
  dataSub: Subscription;
  displayAssignmentDialog: boolean;
  @ViewChild(AssignmentViewComponent) assignmentViewComponentRef: AssignmentViewComponent;

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.dataSub = this.route.data.subscribe((data) => {
      this.dashboardDTOStudentResolve = data['resolveData'];
      let resolveAssignments = data['resolveAssignments'] as IMyAssignResolve;

      this.dashboardDTOStudent = this.dashboardDTOStudentResolve.dashboardDTOStudent;
      if (this.dashboardDTOStudent.sessionSummary.length == 3) {
        let result = this.dashboardDTOStudent.sessionSummary.filter(obj => obj.sessionType == 'Attended');
        this.attended = result[0].numberOfSessions;

        result = this.dashboardDTOStudent.sessionSummary.filter(obj => obj.sessionType == 'Missed');
        this.missed = result[0].numberOfSessions;

        result = this.dashboardDTOStudent.sessionSummary.filter(obj => obj.sessionType == 'TotalSessions');
        this.totalSessions = result[0].numberOfSessions;

      }
      this.assignmentList = resolveAssignments.assignments;
      if (resolveAssignments.error) {
        this.errorMessage = resolveAssignments.error;
      }
    });
  }
  displayAssignmentDetail(data): void {
    this.assignmentViewComponentRef.assignment = data;
    this.displayAssignmentDialog = true;
  }
  ngOnDestroy(): void {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
  }
  onDialogHide(): void {
    this.displayAssignmentDialog = false;
  }
  onDialogClose(): void {
    this.displayAssignmentDialog = false;
  }
}
