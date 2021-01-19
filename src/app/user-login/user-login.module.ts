import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoginComponent } from './app-login/app-login.component';
import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AppLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'login',
        component:AppLoginComponent
      }
    ])
  ]
})
export class UserLoginModule { }
