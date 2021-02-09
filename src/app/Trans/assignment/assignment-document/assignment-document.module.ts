import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentDocumentListComponent } from './list/assignment-document-list.component';
import { AssignmentDocumentAddComponent } from './add/assignment-document-add.component';
import { AssignmentDocumentEditComponent } from './edit/assignment-document-edit.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import { AssignmentDocumentListResolveService } from './assignment-document-list-resolve.service';
import { DocumentTypeResolverService } from 'src/app/Core/services/resolvers/document-type-resolver.service';



@NgModule({
  declarations: [AssignmentDocumentListComponent, AssignmentDocumentAddComponent, AssignmentDocumentEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'assignmentdoc/:id/:queTitle/:subjectName',
        component:AssignmentDocumentListComponent,
        resolve:{resolveData:AssignmentDocumentListResolveService, resolveDocTypes:DocumentTypeResolverService}
      },
      {
        path:'assignmentdocadd/:id',
        component:AssignmentDocumentAddComponent
      },
      {
        path:'assignmentdocedit/:id',
        component:AssignmentDocumentEditComponent
      }
    ])
  ]
})
export class AssignmentDocumentModule { }
