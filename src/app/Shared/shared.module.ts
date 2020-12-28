import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModulesModule } from './prime-ngmodules/prime-ngmodules.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModulesModule
 
  ]
})
export class SharedModule { }
