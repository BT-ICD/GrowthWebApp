import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssignmentDataService } from '../assignment-data.service';

@Component({
  selector: 'app-assignment-add',
  templateUrl: './assignment-add.component.html',
  styleUrls: ['./assignment-add.component.scss']
})
export class AssignmentAddComponent implements OnInit {
assignmentForm:FormGroup;
errorMessage:string;
  constructor(private router:Router, private fb:FormBuilder, private assignmentDataService:AssignmentDataService ) { }

  ngOnInit(): void {
    this.assignmentForm = this.fb.group({
      queTitle:['',Validators.required],
      queHtml:[''],
      notes:['']
    });
  }
  onSubmit():void{
    console.log(this.assignmentForm.value);
  }
}
