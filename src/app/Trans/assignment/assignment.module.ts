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
import { BatchLookupResolverService } from 'src/app/Core/services/batch-lookup-resolver.service';
import { StudentLookupResolverService } from 'src/app/Core/services/resolvers/student-lookup-resolver.service';
import { AssignmentReviewComponent } from './assignment-review/assignment-review.component';
import { AssigmmentReviewResolveService } from './assigmment-review-resolve.service';
import { AssignmentReviewNoteComponent } from './assignment-review-note/assignment-review-note.component';
import { AssignmentReviewNoteResolveService } from './assignment-review-note-resolve.service';



@NgModule({
  declarations: [AssignmentListComponent,AssignmentAddComponent,AssignmentEditComponent, AssignmentReviewComponent, AssignmentReviewNoteComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditorModule,
    RouterModule.forChild([
      {
        path:'assignment',
        component:AssignmentListComponent,
        resolve:{resolveData:AssignmentListResolveService, resolveBatchLookup:BatchLookupResolverService, resolveStudentLookup:StudentLookupResolverService}
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
      },
      {
        path:'assignmentreview/:id',
        component:AssignmentReviewComponent,
        resolve:{resolveData:AssigmmentReviewResolveService}
      },
      {
        path:'assignmentreviewnote/:id/:status/:studentid',
        component:AssignmentReviewNoteComponent,
        resolve:{resolveData:AssignmentReviewNoteResolveService}
      }

    ])
  ]
})
export class AssignmentModule { }
