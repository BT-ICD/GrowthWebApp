import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISubjectLookup, ISubjectLookupResolver } from 'src/app/Core/types/common-types';
import { AssignmentDataService } from '../assignment-data.service';
import { IAssignmentDTOEdit, IAssignmentResolver } from '../assignment-types';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit , OnDestroy{
  assignmentResolver:IAssignmentResolver;
  dTOEdit:IAssignmentDTOEdit
  assignmentForm:FormGroup;
  errorMessage:string;
  subjectLookup:ISubjectLookup[];
  subjectListResolve:ISubjectLookupResolver;
  routeDataSub:Subscription;
  editDataSub:Subscription;
  constructor(private route:ActivatedRoute,private router:Router, private assignmentDataService:AssignmentDataService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.routeDataSub= this.route.data.subscribe((data)=>{
      this.assignmentResolver = data['resolveData'];
      this.subjectListResolve = data['resolveSubjectList'];
      this.dTOEdit = this.assignmentResolver.assignment;
      if(this.assignmentResolver.error){
        this.errorMessage = this.assignmentResolver.error;
      }
      this.subjectLookup= this.subjectListResolve.subjects;
      if(this.subjectListResolve.error){
        if(this.errorMessage!=""){
          this.errorMessage +=  ' ' + this.subjectListResolve.error;
        }
        else
        {
          this.errorMessage = this.subjectListResolve.error;
        }
      }
    });
    this.initializeForm();
  }
  initializeForm():void{
    this.assignmentForm = this.fb.group({
      assignmentId:[this.dTOEdit.assignmentId,Validators.required],
      queTitle:[this.dTOEdit.queTitle,Validators.required],
      queHtml:[this.dTOEdit.queHtml],
      notes:[this.dTOEdit.notes],
      subjectId:[this.dTOEdit.subjectId,Validators.required]
    });
  }
  onSubmit():void{
    if(this.assignmentForm.valid){
      this.dTOEdit = Object.assign(this.assignmentForm.value);
      this.editDataSub= this.assignmentDataService.edit(this.dTOEdit).subscribe((data)=>{
        if(data){
          this.router.navigate(['/assignment']);
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.routeDataSub)
      this.routeDataSub.unsubscribe();
    if(this.editDataSub){
      this.editDataSub.unsubscribe();
    }
  }


}
