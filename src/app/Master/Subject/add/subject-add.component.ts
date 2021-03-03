import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectDataService } from '../subject-data.service';
import { ISubjectAdd } from '../subject-types';

@Component({
  selector: 'app-subject-add',
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.css']
})
export class SubjectAddComponent implements OnInit {
subjectAdd:ISubjectAdd;
errorMessage:string;
subjectForm:FormGroup;
  constructor(private router:Router, private subjectDataService:SubjectDataService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm():void{
    this.subjectForm = this.fb.group({
      name:['', Validators.required],
      prerequisite:[''],
      notes:['']
    })
  }
onSubmit():void{
  
  if(this.subjectForm.valid){
    this.subjectAdd = Object.assign(this.subjectForm.value);
    this.subjectDataService.addNew(this.subjectAdd).subscribe((data)=>{
      if(data){
        this.router.navigate(['/subject']);
      }
    });
  }
  }
}