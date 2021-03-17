import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamAdminListComponent } from './list/exam-admin-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import { ExamAdminAddComponent } from './add/exam-admin-add.component';



@NgModule({
  declarations: [ExamAdminListComponent, ExamAdminAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'examadminlist',
        component:ExamAdminListComponent
      },
      {
        path:'examadminadd',
        component:ExamAdminAddComponent
      }
    ])
  ]
})
export class ExamAdminModule { }
