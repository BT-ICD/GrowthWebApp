import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { AssignmentDataService } from '../assignment-data.service';
import { IAssignmentDTOList, IAssignmentListResolver } from '../assignment-types';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss','tabledemo.scss'],
  providers:[MessageService]
})
export class AssignmentListComponent implements OnInit, OnDestroy {
  assignmentListResolver:IAssignmentListResolver
  assignmentList:IAssignmentDTOList[];
  errorMessage:string;
  selectedAssignment:IAssignmentDTOList;
  routeDataSubscription:Subscription;
  deleteRecSub:Subscription;
  cols:any[];
  constructor(private route:ActivatedRoute, private router:Router , private assignmentDataService:AssignmentDataService, private messageService:MessageService, private dataConstantsService:DataConstantsService) { }

  ngOnInit(): void {
    this.routeDataSubscription= this.route.data.subscribe((data)=>{
      this.assignmentListResolver  = data['resolveData'];
      this.assignmentList = this.assignmentListResolver.assignmentList;
      if(this.assignmentListResolver.error){
        this.errorMessage= this.assignmentListResolver.error;
      }
      
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
    if(!this.selectedAssignment){
      alert('None record selected. Please select record');
      return;
    }
    this.router.navigate(['/assignmentedit',this.selectedAssignment.assignmentId]);
    
  }
  deleteRecord():void{
    if(!this.selectedAssignment){
      alert('None record selected. Please select record');
      return;
    }
    this.deleteRecSub = this.assignmentDataService.delete(this.selectedAssignment.assignmentId).subscribe((data)=>{
      let index = this.assignmentList.findIndex(obj=>obj.assignmentId===this.selectedAssignment.assignmentId);
      this.assignmentList.splice(index,1);
      this.messageService.add({severity:'info',summary:'Record deleted', detail:'Assignment deleted:' + this.selectedAssignment.queTitle});
      this.selectedAssignment = null;  
    })
  }
  ngOnDestroy(): void {
    if(this.routeDataSubscription){
      this.routeDataSubscription.unsubscribe();
    }
    if(this.deleteRecSub){
      this.deleteRecSub.unsubscribe();
    }
  }


}
