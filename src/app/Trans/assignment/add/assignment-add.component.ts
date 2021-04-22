import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISubjectLookup, ISubjectLookupResolver } from 'src/app/Core/types/common-types';
import { AssignmentDataService } from '../assignment-data.service';
import { IAssignmentDTOAdd } from '../assignment-types';

@Component({
  selector: 'app-assignment-add',
  templateUrl: './assignment-add.component.html',
  styleUrls: ['./assignment-add.component.scss']
})
export class AssignmentAddComponent implements OnInit, OnDestroy {

assignmentForm:FormGroup;
errorMessage:string;
addNewSub:Subscription;
subjectLookup:ISubjectLookup[];
subjectListResolve:ISubjectLookupResolver;
  constructor(private router:Router, private route:ActivatedRoute, private fb:FormBuilder, private assignmentDataService:AssignmentDataService ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      this.subjectListResolve = data['resolveSubjectList'];
      this.subjectLookup= this.subjectListResolve.subjects;
      if(this.subjectListResolve.error){
        this.errorMessage = this.subjectListResolve.error;
      }
      
    })
    this.initializeForm();
  }
  
  initializeForm():void{
    this.assignmentForm = this.fb.group({
      queTitle:['',Validators.required],
      queHtml:[''],
      notes:[''],
      subjectId:[null,Validators.required],
      isFileSubmitRequired:[false]
    });
  }
  onSubmit():void{

    let dtoAdd:IAssignmentDTOAdd;
    if(this.assignmentForm.valid){
      dtoAdd = Object.assign(this.assignmentForm.value);
      
      this.addNewSub= this.assignmentDataService.addnew(dtoAdd).subscribe((data)=>{
        if(data){
          this.router.navigate(['/assignment']);
        }
      }) 
    }
  }
  ngOnDestroy(): void {
    if(this.addNewSub){
      this.addNewSub.unsubscribe();
    }
  }

}
