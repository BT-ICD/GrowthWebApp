import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyExamComponent } from './my-exam/my-exam.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import { StuExamDataResolveService } from './my-exam/stu-exam-data-resolve.service';



@NgModule({
  declarations: [MyExamComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path:'myexam/:examid/:studentid',
      component:MyExamComponent,
      resolve:{resolveData:StuExamDataResolveService}
    }])
  ]
})
export class StuExamModule { }
