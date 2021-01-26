import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateUtilService } from 'src/app/Core/services/date-util.service';
import { IBatchLookup, ISubjectLookup } from 'src/app/Core/types/common-types';
import { IScheduleDetail, IScheduleEdit, IScheduleResolver } from 'src/app/Trans/schedule/ischedule-types';
import { ScheduleDataService } from '../../schedule-data.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  schedule:IScheduleDetail;
  scheduleResolver:IScheduleResolver
  errorMessage:string;
  scheduleForm:FormGroup;
  batchLookup:IBatchLookup[];
  subjectLookup:ISubjectLookup[];
  datepipe=  new DatePipe((new Date()).toString());
  constructor ( private route:ActivatedRoute, private router:Router,private scheduleDataService:ScheduleDataService , private fb:FormBuilder, private dateUtilService: DateUtilService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      this.scheduleResolver = data['resolveData'];
      this.schedule = this.scheduleResolver.schedule;
      
      console.log(this.schedule);
      if(this.scheduleResolver.error){
        this.errorMessage= this.scheduleResolver.error;
      }

      let resolveSubjectLookup = data['resolveSubjectLookup'];
      if(resolveSubjectLookup.error){
        if(this.errorMessage!=''){
          this.errorMessage += ', ' + resolveSubjectLookup.error;
        }
        else{
          this.errorMessage=resolveSubjectLookup.error;
        }
      }
      this.onSubjectLookupRetrieved(resolveSubjectLookup.subjects);

      let resolveBatchLookup = data['resolveBatchLookup'];
      if(resolveBatchLookup.error){
        if(this.errorMessage!=''){
          this.errorMessage += ', ' + resolveBatchLookup.error;
        }
        else{
          this.errorMessage=resolveBatchLookup.error;
        }
      }
      this.onBatchLookupRetrieved(resolveBatchLookup.batchList);

    })
    this.initializeForm();
  }
  onSubjectLookupRetrieved(data:ISubjectLookup[]):void{
    this.subjectLookup = data;
  }
  onBatchLookupRetrieved(data:IBatchLookup[]):void{
    this.batchLookup = data;
    
  }
  initializeForm():void{
    let lectureFromstr = this.dateUtilService.dateToDateTimeString(this.schedule.lectureFrom);
    let lectureToStr = this.dateUtilService.dateToDateTimeString(this.schedule.lectureTo);

    this.scheduleForm = this.fb.group({
      scheduleId:[this.schedule.scheduleId,Validators.required],
      batchId:[this.schedule.batchId,Validators.required],
      subjectId:[this.schedule.subjectId,Validators.required],
      lectureFrom:[{value :new Date(lectureFromstr), disabled:false}, Validators.required],
      lectureTo:[{value :new Date(lectureToStr), disabled:false},Validators.required],
      sessionContent:[this.schedule.sessionContent,Validators.required],
      notes:[this.schedule.notes]
    })
  }
  onSubmit():void{
    let scheduleEdit:IScheduleEdit;
    scheduleEdit= Object.assign(this.scheduleForm.value);
    if(this.scheduleForm.valid){
      this.scheduleDataService.edit(scheduleEdit).subscribe((data)=>{
        this.router.navigate(['/schedule']);
      })
    }    
  }
}
