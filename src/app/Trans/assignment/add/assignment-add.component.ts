import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  constructor(private router:Router, private fb:FormBuilder, private assignmentDataService:AssignmentDataService ) { }

  ngOnInit(): void {
    this.assignmentForm = this.fb.group({
      queTitle:['',Validators.required],
      queHtml:[''],
      notes:['']
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
