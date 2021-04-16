
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMyAssignments, IMyAssignmentsResolve } from '../stu-assignment-types';


@Component({
  selector: 'app-stu-assignment-list',
  templateUrl: './stu-assignment-list.component.html',
  styleUrls: ['./stu-assignment-list.component.scss','./tabledemo.scss']
})
export class StuAssignmentListComponent implements OnInit, OnDestroy {
  assignmentList:IMyAssignments[];
  selectedAssignment:IMyAssignments;
  errorMessage:String;
  cols:any[];
  dataSub:Subscription;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.dataSub= this.route.data.subscribe((data)=>{
      let resolveData = data['resolveData'] as IMyAssignmentsResolve;
      this.assignmentList= resolveData.myAssignments;
      if(resolveData.error){
        this.errorMessage=resolveData.error;
      }
    })
    this.defineColumnsForList();
  }

  defineColumnsForList():void{
    this.cols =[
      {field:'assignmentId',header:'Id', width:'07%' },
      {field:'subjectName',header:'Subject', width:'30%' },
      {field:'queTitle',header:'Assignment', width:'40%'},
      {field:'status',header:'Status',width:'15%'},
      {field:'allocatedOn',header:'Allocated', width:'13%'}
      
    ]
  }
  assignmentDetail():void{
    if(!this.selectedAssignment){
      alert('None assignment selected. Please select assignment and try again.');
      return;
    }
    this.router.navigate(['myassignment', this.selectedAssignment.assignmentAllocationId]);
  }
  ngOnDestroy(): void {
    if(this.dataSub){
      this.dataSub.unsubscribe();
    }
  }

}
