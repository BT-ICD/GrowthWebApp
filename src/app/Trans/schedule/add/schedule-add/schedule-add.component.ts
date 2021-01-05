import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IBatchLookup, ISubjectLookup } from 'src/app/Core/types/common-types';
import { IScheduleAdd } from 'src/app/Trans/ischedule-types';
import { ScheduleDataService } from '../../schedule-data.service';

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {
scheduleAdd:IScheduleAdd;
errorMessage:string;
scheduleForm:FormGroup;
batchLookup:IBatchLookup[];
subjectLookup:ISubjectLookup[];

  constructor( private route:ActivatedRoute, private router:Router, private scheduleDataService:ScheduleDataService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      let resolveData = data['resolveBatchLookup'];
      let resulveSubjets = data['resolveSubjectLookup'];
      if(resolveData.error){
        this.errorMessage = resolveData.error;
      }
      if(resulveSubjets.error){
        if(this.errorMessage!='')
            this.errorMessage+= ' ' + resulveSubjets.error;
        else
          this.errorMessage= ' ' + resulveSubjets.error;

      }
      this.onBatchListRetrieved(resolveData.batchList);
      this.onSujectListRetrieved(resulveSubjets.subjects);
    })
    this.initializeForm();
  }
  
  initializeForm():void{
    this.scheduleForm = this.fb.group({
      batchId:[null,Validators.required],
      subjectId:[null,Validators.required],
      lectureFrom:[, Validators.required],
      lectureTo:[null,Validators.required],
      sessionContent:['',Validators.required],
      notes:['']
    })
  }
  onBatchListRetrieved(data:IBatchLookup[]):void{
    this.batchLookup= data;
    console.log(this.batchLookup);
  }
  onSujectListRetrieved(data:ISubjectLookup[]):void{
    this.subjectLookup= data;
    console.log(this.subjectLookup);
  }
  onSubmit():void{
    console.log(this.scheduleForm.valid);
    console.log(this.scheduleForm.get('lectureFrom').value);

    if(this.scheduleForm.valid){
      this.scheduleAdd = Object.assign(this.scheduleForm.value);
      this.scheduleDataService.addNew(this.scheduleAdd).subscribe((data)=>{
        this.router.navigate(['schedule']);
      })
    }

  }

}
