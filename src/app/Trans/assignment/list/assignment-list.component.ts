import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IAssignmentDTOList, IAssignmentListResolver } from '../assignment-types';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss','tabledemo.scss']
})
export class AssignmentListComponent implements OnInit, OnDestroy {
  assignmentListResolver:IAssignmentListResolver
  assignmentList:IAssignmentDTOList[];
  errorMessage:string;
  selectedAssignment:IAssignmentDTOList;
  routeDataSubscription:Subscription;
  cols:any[];
  constructor(private route:ActivatedRoute, private router:Router , private dataConstantsService:DataConstantsService) { }

  ngOnInit(): void {
    this.routeDataSubscription= this.route.data.subscribe((data)=>{
      this.assignmentListResolver  = data['resolveData'];
      this.assignmentList = this.assignmentListResolver.assignmentList;
      if(this.assignmentListResolver.error){
        this.errorMessage= this.assignmentListResolver.error;
      }
      console.log(this.assignmentList);
    });
    this.initializeColumns();
  }
  initializeColumns():void{
    this.cols=[
      {field:'assignmentId',header:'Id', width:'07%'},
      {field:'queTitle',header:'Description'}
      
    ];
  }
  editRecord():void{
    
  }
  deleteRecord():void{
    
  }
  ngOnDestroy(): void {
    if(this.routeDataSubscription){
      this.routeDataSubscription.unsubscribe();
    }
  }


}
