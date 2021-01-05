import { NgModule } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [],
  imports: [
 
  ],
  exports:[
    ToolbarModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    DropdownModule,
    CalendarModule
  ]
})
export class PrimeNGModulesModule { }
