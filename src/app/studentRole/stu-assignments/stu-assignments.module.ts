import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StuAssignmentListComponent } from './list/stu-assignment-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import {  StuAssignmentListResolver } from './stu-assignment-list-resolve.service';



@NgModule({
  declarations: [StuAssignmentListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'myassignments',
        component:StuAssignmentListComponent,
        resolve:{resolveData:StuAssignmentListResolver}
      }
    ])
  ]
})
export class StuAssignmentsModule { }
