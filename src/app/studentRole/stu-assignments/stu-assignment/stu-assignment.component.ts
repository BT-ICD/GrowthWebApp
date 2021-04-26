import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
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

  constructor(private route:ActivatedRoute, private router:Router, private fb:FormBuilder, private dataConstantsService:DataConstantsService, private stuAssignmentDataService:StuAssignmentDataService) { }

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
  get comments():FormControl{
    // return this.assignmentForm.controls['comments'] as FormControl;
    return this.assignmentForm.get('comments') as FormControl;
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
    if(this.comments.invalid){
      alert('Comments is required');
      return;
    }
    if(this.assignmentForm.valid){
      const formData = new FormData();
      formData.append('assignmentAllocationId',this.myAssignment.assignmentAllocationId.toString());
      formData.append('comments',this.assignmentForm.get('comments').value);
      formData.append('file',this.fileData);
      
      this.stuAssignmentDataService.submitAssignment(formData).subscribe((data)=>{
        this.router.navigate(['myassignments']);
      })
    }
    
  }
  downloadRefDocument():void{
    const url:string = this.dataConstantsService.BASEAPIURL +'StudentAssignment/Download/' + this.myAssignment.assignmentId;
    console.log(url);
    const link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.setAttribute('href', url);
    document.body.append(link);
    link.click();
    link.remove();
  }
}
