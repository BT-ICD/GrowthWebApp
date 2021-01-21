import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { StuScheduleListComponent } from './list/stu-schedule-list.component';
import { RouterModule } from '@angular/router';
import { StuScheduleListResolveService } from './list/stu-schedule-list-resolve.service';



@NgModule({
  declarations: [StuScheduleListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'myschedule',
        component:StuScheduleListComponent,
        resolve:{resolveData:StuScheduleListResolveService}
      }
    ])
  ]
})
export class StuScheduleModule { }
