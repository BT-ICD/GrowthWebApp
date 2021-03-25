import { NgModule } from '@angular/core';
import { UserListComponent } from './list/user-list.component';
import { RouterModule } from '@angular/router';
import { UserListResolveService } from './list/user-list-resolve.service';
import { UserAddComponent } from './add/user-add.component';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [UserListComponent, UserAddComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'userlist',
        component:UserListComponent,
        resolve:{resolveData:UserListResolveService}
      },
      {
        path:'useradd',
        component:UserAddComponent
      }
    ])
  ]
})
export class UsersModule { }
