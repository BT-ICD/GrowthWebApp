import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChapterListComponent } from './list/chapter-list.component';
import { RouterModule } from '@angular/router';
import { ChapterListResolveService } from './list/chapter-list-resolve.service';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ChapterAddComponent } from './add/chapter-add.component';
import { ChapterEditComponent } from './edit/chapter-edit.component';
import { SubjectLookupResolverService } from 'src/app/Core/services/subject-lookup-resolver.service';
import { ChapterResolveService } from './chapter-resolve.service';



@NgModule({
  declarations: [ChapterListComponent, ChapterAddComponent, ChapterEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      
      {
        path:'chapter/:id/:name',
        component:ChapterListComponent,
        resolve:{resolveData:ChapterListResolveService}
      },
      {
        path:'chapteradd',
        component:ChapterAddComponent,
        resolve:{resolveData:SubjectLookupResolverService}
      },
      {
        path:'chapteredit/:id',
        component:ChapterEditComponent,
        resolve:{resolveData: ChapterResolveService ,  resolveSubjectList:SubjectLookupResolverService}
      }
    ])
  ]
})
export class ChapterModule { }
