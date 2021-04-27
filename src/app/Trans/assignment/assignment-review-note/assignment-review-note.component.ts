import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { AssignmentDataService } from '../assignment-data.service';
import { IAssignmenReviewListLogResolve, IAssignmentAllocationStudents, IassignmentLogDTOAdd, IAssignmentLogDTOReviewListStudent } from '../assignment-types';

@Component({
  selector: 'app-assignment-review-note',
  templateUrl: './assignment-review-note.component.html',
  styleUrls: ['./assignment-review-note.component.scss','./tabledemo.scss']
})
export class AssignmentReviewNoteComponent implements OnInit {
  assignmenReviewListLogResolve:IAssignmenReviewListLogResolve;
  assignmentLogDTOReviewListStudent:IAssignmentLogDTOReviewListStudent[];
  selectedassignment:IAssignmentLogDTOReviewListStudent;
  errorMessage:string;
  colsStudents:any[];
  constructor(private route:ActivatedRoute,private router:Router, private fb:FormBuilder , private dataConstantsService:DataConstantsService, private assignmentDataService:AssignmentDataService) { }
  comments:string;
  ngOnInit(): void {
    this.loadData();
    this.initializeColStudents();
  }

  loadData():void{
    this.route.data.subscribe((data)=>{
      this.assignmenReviewListLogResolve = data['resolveData'];
      this.assignmentLogDTOReviewListStudent = this.assignmenReviewListLogResolve.assignmentListStudent;
      if(this.assignmenReviewListLogResolve.error){
        this.errorMessage = this.assignmenReviewListLogResolve.error;
      }
    })
  }
  
  initializeColStudents():void{
    this.colsStudents=[
      {field:'assignmentLogId',header:'Submission',width:'13%'},
      {field:'assignmentAllocationId',header:'assignmentAllocationId', display:'none'},
      {field:'statusDesc',header:'Status',display:'none'},
      {field:'studentId',header:'Student Id',display:'none'},
      {field:'studentName',header:'Name', width:'30%'},
      {field:'submittedOn',header:'Submitted on', width:'30%'},
    ];
  }
  onDetailView(data:IAssignmentLogDTOReviewListStudent):void{
    this.selectedassignment = data;
  }
  submitStatus(status:number):void{
      const obj: IassignmentLogDTOAdd={
        assignmentAllocationId:this.selectedassignment.assignmentAllocationId,
        comments:this.comments,
        status:status,
        actualFileName:''
      }
      this.assignmentDataService.submitReview(obj).subscribe((data)=>{
        this.router.navigate(['assignmentreview', this.selectedassignment.assignmentId]);
      });
    }
    downloadRefDocument():void{
      const url:string = this.dataConstantsService.BASEAPIURL +'AssignmentAllocation/DownloadSubmittedDocument/' + this.selectedassignment.assignmentLogId;
      const link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute('href', url);
      document.body.append(link);
      link.click();
      link.remove();
    }
}
