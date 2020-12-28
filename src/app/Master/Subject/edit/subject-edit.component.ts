import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectDataService } from '../subject-data.service';
import { ISubjectDetail, ISubjectResolver } from '../subject-types';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  subjectResolver:ISubjectResolver
  subject:ISubjectDetail;
  errorMessage:String;
  subjectForm:FormGroup;
  constructor(private route:ActivatedRoute, private fb:FormBuilder, private subjectDataService:SubjectDataService, private router:Router) { }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      this.subjectResolver = data['resolveData'];
      this.errorMessage = this.subjectResolver.error;
      this.onSubjectRetrieved(this.subjectResolver.subject);
    });

    this.initializeForm();
  }
  //Initialize Form Group 
  private initializeForm() {
    this.subjectForm = this.fb.group({
      subjectId: [this.subject.subjectId, Validators.required],
      name: [this.subject.name, Validators.required],
      prerequisite: [this.subject.prerequisite],
      notes: [this.subject.notes]
    });
  }

  onSubjectRetrieved(data:ISubjectDetail){
    this.subject = data;
  }
  onSubmit(){
    console.log(this.subject);
    this.subject = Object.assign(this.subjectForm.value);
    if(this.subjectForm.valid){
      this.subjectDataService.edit(this.subject).subscribe((data)=>{
        console.log('modified');
        console.log(data);
        this.router.navigate(['/subject']);
      });
    }
    
  }

}
