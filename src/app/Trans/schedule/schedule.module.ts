import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ScheduleListComponent } from './list/schedule-list.component';
import { RouterModule } from '@angular/router';
import { ScheduleListResolveService } from './list/schedule-list-resolve.service';
import { ScheduleAddComponent } from './add/schedule-add/schedule-add.component';
import { ScheduleEditComponent } from './add/schedule-edit/schedule-edit.component';
import { BatchLookupResolverService } from 'src/app/Core/services/batch-lookup-resolver.service';
import { SubjectLookupResolverService } from 'src/app/Core/services/subject-lookup-resolver.service';
import { ScheduleResolveService } from './schedule-resolve.service';
import { ScheduleAttendanceComponent } from './schedule-attendance/schedule-attendance.component';



@NgModule({
  declarations: [ScheduleListComponent, ScheduleAddComponent, ScheduleEditComponent, ScheduleAttendanceComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'schedule',
        component:ScheduleListComponent,
        resolve:{resolveData:ScheduleListResolveService}
      },
      {
        path:'scheduleadd',
        component:ScheduleAddComponent,
        resolve: {resolveBatchLookup:BatchLookupResolverService, resolveSubjectLookup:SubjectLookupResolverService}
      },
      {
        path:'scheduleedit/:id',
        component:ScheduleEditComponent,
        resolve: {resolveData:ScheduleResolveService, resolveBatchLookup:BatchLookupResolverService, resolveSubjectLookup:SubjectLookupResolverService}
      }
    ])
  ]
})
export class ScheduleModule { }
