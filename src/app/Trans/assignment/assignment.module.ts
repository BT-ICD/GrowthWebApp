import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import {EditorModule} from 'primeng/editor';

import { AssignmentListResolveService } from './assignment-list-resolve.service';
import { AssignmentListComponent } from './list/assignment-list.component';
import { AssignmentAddComponent } from './add/assignment-add.component';
import { AssignmentEditComponent } from './edit/assignment-edit.component';
import { AssignmentResolveService } from './assignment-resolve.service';
import { SubjectLookupResolverService } from 'src/app/Core/services/subject-lookup-resolver.service';



@NgModule({
  declarations: [AssignmentListComponent,AssignmentAddComponent,AssignmentEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditorModule,
    RouterModule.forChild([
      {
        path:'assignment',
        component:AssignmentListComponent,
        resolve:{resolveData:AssignmentListResolveService}
      },
      {
        path:'assignmentadd',
        component:AssignmentAddComponent,
        resolve:{resolveSubjectList:SubjectLookupResolverService}
      },
      {
        path:'assignmentedit/:id',
        component:AssignmentEditComponent,
        resolve:{resolveData:AssignmentResolveService, resolveSubjectList:SubjectLookupResolverService}
      }

    ])
  ]
})
export class AssignmentModule { }
