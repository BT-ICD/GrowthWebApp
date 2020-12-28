import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//Component and Services related to subject feature
import { SubjectListResolveService } from './list/subject-list-resolve.service';
import { SubjectListComponent } from './List/subject-list.component';
import { SubjectEditComponent } from './edit/subject-edit.component';
import { SubjectResolveService } from './subject-resolve.service';
import { SubjectAddComponent } from './add/subject-add.component';

//Shared module
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [SubjectListComponent, SubjectEditComponent, SubjectAddComponent],
  imports: [
    SharedModule,
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
