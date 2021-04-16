import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { StuAssignmentDataService } from '../stu-assignment-data.service';
import { IAssignmentLogDTODetail, IAssignmentLogResolve, IMyAssignmentResolve, IMyAssignments } from '../stu-assignment-types';

@Component({
  selector: 'app-stu-assignment',
  templateUrl: './stu-assignment.component.html',
  styleUrls: ['./stu-assignment.component.scss']
})
export class StuAssignmentComponent implements OnInit {
  myAssignmentResolve:IMyAssignmentResolve;
  assignmentLogResolve:IAssignmentLogResolve;
  assignmentLog:IAssignmentLogDTODetail[];
  myAssignment:IMyAssignments;
  errorMessage:string;
  fileData:File;
  assignmentForm:FormGroup;
  
  @ViewChild('pfUpload') pfUpload:ElementRef;

  constructor(private route:ActivatedRoute, private router:Router, private fb:FormBuilder, private stuAssignmentDataService:StuAssignmentDataService) { }

  ngOnInit(): void {
    this.loadData();
    this.initializeForm();
   
  }

  loadData():void{
    this.route.data.subscribe((data)=>{
      this.myAssignmentResolve = data['resolveData'];
      this.myAssignment = this.myAssignmentResolve.myAssignment;
      if(this.myAssignmentResolve.error){
        this.errorMessage = this.myAssignmentResolve.error;
      }
      this.assignmentLogResolve = data['resolveLog'];
      this.assignmentLog= this.assignmentLogResolve.assignmentLogs;
      if(this.assignmentLogResolve){
        this.errorMessage +=this.assignmentLogResolve.error;
      }
    })
  }
  initializeForm():void{
    this.assignmentForm = this.fb.group(
      {
        comments:['',Validators.required]
      }
    );
  }
  onSelect(evetData){
    this.fileData = <File>evetData.files[0];
  }
  clearFileSelection(data:FileUpload){
    if(data.files.length>0){
     data.clear();
     this.fileData=null;
    }
     
   }
  onSubmit():void{
    const formData = new FormData();
    formData.append('assignmentAllocationId',this.myAssignment.assignmentAllocationId.toString());
    formData.append('comments',this.assignmentForm.get('comments').value);
    formData.append('file',this.fileData);
    
    this.stuAssignmentDataService.submitAssignment(formData).subscribe((data)=>{
      this.router.navigate(['myassignments']);
    })
  }
}
