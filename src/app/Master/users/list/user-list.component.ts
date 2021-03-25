import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppUserDTOList, IAppUserListResolve } from '../iuser-types';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
users:IAppUserDTOList[];
appUserListResolve: IAppUserListResolve;
errorMessage:string;
cols:any[];
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.loadData();
    this.initializeCols();
  }
loadData():void{
  this.route.data.subscribe((data)=>{
    this.appUserListResolve = data['resolveData'];
    this.users = this.appUserListResolve.users;
    if(this.appUserListResolve.error){
      this.errorMessage= this.appUserListResolve.error;
    }
    console.log(this.users);
  });
}
initializeCols():void{
  this.cols=[
    {field:'userName',header:'Name',width:'25%'},
    {field:'email',header:'Email',width:'40%'},
  ]
}
}
