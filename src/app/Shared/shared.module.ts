import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModulesModule } from './prime-ngmodules/prime-ngmodules.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CustomSpinnerComponent } from './custom-spinner/custom-spinner.component';
import { BatchWiseStudentListComponent } from './partialcomponents/batch-wise-student-list/batch-wise-student-list.component';



@NgModule({
  declarations: [CustomSpinnerComponent, BatchWiseStudentListComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNGModulesModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModulesModule,
    CustomSpinnerComponent,
    BatchWiseStudentListComponent
  ]
})
export class SharedModule { }
