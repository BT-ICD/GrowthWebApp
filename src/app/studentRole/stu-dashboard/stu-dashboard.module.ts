import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StuBoardComponent } from './stu-board/stu-board.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import { StuBoardResolveService } from './stu-board-resolve.service';
import { AuthGuardGuard } from 'src/app/Core/services/auth/auth-guard.guard';
import { MyTaskResolveService } from './my-task-resolve.service';



@NgModule({
  declarations: [StuBoardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'stuboard',
        component:StuBoardComponent,
        resolve:{resolveData:StuBoardResolveService, resolveAssignments:MyTaskResolveService},
        canActivate:[AuthGuardGuard]
      }
    ])
  ]
})
export class StuDashboardModule { }
