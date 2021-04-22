import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentDataService } from '../assignment-data.service';
import { IAssignmentDTODetail, IAssignmentLogDTOReviewListStudent, IAssignmentReviewDTOList, IAssignmentReviewResolve, IStatusSummaries } from '../assignment-types';

@Component({
  selector: 'app-assignment-review',
  templateUrl: './assignment-review.component.html',
  styleUrls: ['./assignment-review.component.scss','./tabledemo.scss']
})
export class AssignmentReviewComponent implements OnInit {
  assignmentReviewResolve:IAssignmentReviewResolve;
  assignmentReviewDTOList:IAssignmentReviewDTOList;
  statusSummaries:IStatusSummaries[];
  assignmentDTODetail:IAssignmentDTODetail;
  errorMessage:string;
  cols:any[];
  assignmentLogDTOReviewListStudent:IAssignmentLogDTOReviewListStudent[];
  colsStudents:any[];
  constructor(private router:Router, private route:ActivatedRoute, private assignmentDataService:AssignmentDataService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData():void{
    this.route.data.subscribe((data)=>{
      this.assignmentReviewResolve = data['resolveData'];
      this.assignmentReviewDTOList = this.assignmentReviewResolve.assignmentReviewDTOList;
      this.assignmentDTODetail= this.assignmentReviewDTOList.assignmentDTODetail;
      this.statusSummaries = this.assignmentReviewDTOList.statusSummaries;
      if(this.assignmentReviewResolve.error){
        this.errorMessage = this.assignmentReviewResolve.error;
      }
      console.log(this.assignmentReviewDTOList);
    });
    this.initializeColumns();
    this.initializeColStudents();
  }
  initializeColumns():void{
    this.cols=[
      {field:'status',header:'status', display:'none'},
      {field:'statusDesc',header:'Status',width:'50%'},
      {field:'numberofStudents',header:'Count', width:'30%'}
    ];
  }
  initializeColStudents():void{
    this.colsStudents=[
      {field:'assignmentAllocationId',header:'assignmentAllocationId', display:'none'},
      {field:'statusDesc',header:'Status',display:'none'},
      {field:'studentId',header:'Student Id',width:'15%'},
      {field:'studentName',header:'Name', width:'30%'},
      {field:'submittedOn',header:'Submitted on', width:'30%'},
    ];
  }
  assigmentStudentDetails(data:IStatusSummaries):void{
    this.assignmentDataService.getReviewListStudentByStatus(this.assignmentDTODetail.assignmentId, data.status).subscribe((data)=>{
      this.assignmentLogDTOReviewListStudent=data;
    })
    
  }
  viewSubmission(data:IAssignmentLogDTOReviewListStudent):void{
    console.log(data);
  }
}
