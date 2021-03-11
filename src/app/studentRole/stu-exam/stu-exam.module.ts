import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyExamComponent } from './my-exam/my-exam.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import { StuExamDataResolveService } from './my-exam/stu-exam-data-resolve.service';
import { MyExamStartComponent } from './my-exam-start/my-exam-start.component';



@NgModule({
  declarations: [MyExamComponent, MyExamStartComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
      path:'myexam/:examStudentId/:examid/:studentid',
      component:MyExamComponent,
      resolve:{resolveData:StuExamDataResolveService}
      },
      {
        path:'selectExam',
        component:MyExamStartComponent
      }
  ])
  ]
})
export class StuExamModule { }
