import {  Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IBatchLookup, IBatchLookupResolver, IStudentLookup, IStudentLookupResolver } from 'src/app/Core/types/common-types';
import { AssignmentDataService } from '../assignment-data.service';
import { IAssignmentAllocationDTOAdd, IAssignmentAllocationStudents, IAssignmentDTODetail, IAssignmentDTOList, IAssignmentListResolver } from '../assignment-types';

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
  actionItems: MenuItem[];
  displayAllocationDialog:boolean;
  batchLookup:IBatchLookup[]
  studentLookup:IStudentLookup[];

  constructor(private route:ActivatedRoute, private router:Router , private assignmentDataService:AssignmentDataService, private messageService:MessageService, private dataConstantsService:DataConstantsService) { }

  ngOnInit(): void {
    this.routeDataSubscription= this.route.data.subscribe((data)=>{
      this.assignmentListResolver  = data['resolveData'];
      let batchLookupResolver: IBatchLookupResolver = data['resolveBatchLookup'];
      let studentLookupResolver:IStudentLookupResolver = data['resolveStudentLookup'];

      this.assignmentList = this.assignmentListResolver.assignmentList;
      if(this.assignmentListResolver.error){
        this.errorMessage= this.assignmentListResolver.error;
      }
      
      this.batchLookup = batchLookupResolver.batchList;
      if(batchLookupResolver.error){
        this.errorMessage += batchLookupResolver.error;
      }

      this.studentLookup = studentLookupResolver.studentLookup;
      if(studentLookupResolver.error){
        this.errorMessage += studentLookupResolver.error;
      }    

    });
    this.initializeColumns();
    this.initializeActionItems();
  }
  initializeActionItems():void{
    this.actionItems = [
      {label: 'Allocate Assignment', icon: 'pi pi-users', command: () => {
          this.allocateAssignment();
      }}
     
  ];
  }
  initializeColumns():void{
    this.cols=[
      {field:'assignmentId',header:'Id', width:'07%'},
      {field:'queTitle',header:'Description',width:'50%'},
      {field:'subjectName',header:'Subject', width:'30%'}
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
  assignmentDocuments(assignment:IAssignmentDTODetail):void{
    this.router.navigate(['assignmentdoc',assignment.assignmentId, assignment.queTitle, assignment.subjectName]);
  }
  allocateAssignment():void{
    if(!this.selectedAssignment){
      alert('None assignment selected. Please select an assignment to allocate');
      return;
    }
    this.displayAllocationDialog=true;
  }
  onAllocationDialogHide():void{
    this.displayAllocationDialog=false;
  }
  onAllocationDialogSubmit(data:IAssignmentAllocationStudents):void{
    
    let submitData: IAssignmentAllocationDTOAdd={
      batchId:data.batchId,  
      assignmentId:this.selectedAssignment.assignmentId,
      studentIds:data.studentIds
      
    }
    this.assignmentDataService.allocatedAssignment(submitData).subscribe((data)=>{
      alert('Assignment allocated to ' + data.recordsAffected + ' Students');
    })
  }
}
