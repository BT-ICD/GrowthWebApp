import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StuAssignmentListComponent } from './list/stu-assignment-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import {  StuAssignmentListResolver } from './stu-assignment-list-resolve.service';
import { StuAssignmentComponent } from './stu-assignment/stu-assignment.component';
import { StuAssignmentResolveService } from './stu-assignment-resolve.service';
import { StuAssignmentLogResolveService } from './stu-assignment-log-resolve.service';



@NgModule({
  declarations: [StuAssignmentListComponent, StuAssignmentComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'myassignments',
        component:StuAssignmentListComponent,
        resolve:{resolveData:StuAssignmentListResolver}
      },
      {
        path:'myassignment/:assignmentAllocationId',
        component:StuAssignmentComponent,
        resolve:{resolveData:StuAssignmentResolveService, resolveLog:StuAssignmentLogResolveService}
      }
    ])
  ]
})
export class StuAssignmentsModule { }
