import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionBankListComponent } from './list/question-bank-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import { QuestionBankListResolveService } from './list/question-bank-list-resolve.service';
import { QuestionAddComponent } from './add/question-add.component';
import { QuetypeLookupResolverService } from 'src/app/Core/services/resolvers/quetype-lookup-resolver.service';



@NgModule({
  declarations: [QuestionBankListComponent, QuestionAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'questionbank/:chapterid/:chaptername/:subjectid/:subjectname',
        component:QuestionBankListComponent,
        resolve:{resolveData:QuestionBankListResolveService}
      },
      {
        path:'questionbankadd/:chapterid',
        component:QuestionAddComponent,
        resolve:{resolveData:QuetypeLookupResolverService}
      }
    ])
  ]
})
export class QuestionBankModule { }
