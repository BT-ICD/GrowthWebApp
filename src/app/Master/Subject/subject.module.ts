import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectListComponent } from './List/subject-list.component';
import { RouterModule } from '@angular/router';
import { SubjectListResolveService } from './list/subject-list-resolve.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { SubjectEditComponent } from './edit/subject-edit.component';
import { SubjectResolveService } from './subject-resolve.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SubjectAddComponent } from './add/subject-add.component';



@NgModule({
  declarations: [SubjectListComponent, SubjectEditComponent, SubjectAddComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'subject',
        children:[
          {
            path:'',
            component:SubjectListComponent,
            resolve:{resolveData:SubjectListResolveService},
          },
          {
            path:'add',
            component:SubjectAddComponent,
          },
          {
            path:':id/edit',
            component:SubjectEditComponent,
            resolve:{resolveData:SubjectResolveService}
          }
          
        ]
      },
    ])
  ]
})
export class SubjectModule { }
