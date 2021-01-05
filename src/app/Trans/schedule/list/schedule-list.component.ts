import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IScheduleList, IScheduleListResolver } from '../../ischedule-types';
import { ScheduleDataService } from '../schedule-data.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css'],
  providers:[MessageService]
})
export class ScheduleListComponent implements OnInit {
  scheduleListResolver: IScheduleListResolver
  private _scheduleList: IScheduleList[];
  public get scheduleList(): IScheduleList[] {
    return this._scheduleList;
  }
  public set scheduleList(value: IScheduleList[]) {
    this._scheduleList = value;
  }
  selectedSchedule:IScheduleList;
  errorMessage:String;
  cols:any[];
  constructor(private route:ActivatedRoute, private router:Router, private dataConstantsService:DataConstantsService, private scheduleDataService : ScheduleDataService, private messageService:MessageService) { 
    this.route.data.subscribe((data)=>{
      this.scheduleListResolver = data['resolveData'];
      this.onScheduleListRetrieved(this.scheduleListResolver.scheduleList);
      if(this.scheduleListResolver.error){
        this.errorMessage= this.scheduleListResolver.error;
      }
      this.defineColumnsForList();
    })
  }
  defineColumnsForList():void{
    this.cols =[
      {field:'scheduleId',header:'Id', width:'5%'},
      {field:'batchId',header:'batchId', display:'none'},
      {field:'batch',header:'Batch', width:'5%'},
      {field:'subjectId',header:'subjectId', display:'none'},
      {field:'subject',header:'Subject',width:'40%'},
      {field:'lectureFrom',header:'From', width:'20%'}

    ]
  }
  onScheduleListRetrieved(data:IScheduleList[]):void{
    this.scheduleList= data;
  }

  ngOnInit(): void {
  }
  editRecord():void{
    if(!this.selectedSchedule){
      alert('Please select particualr schedule and try again');
    }
    this.router.navigate(['/scheduleedit',this.selectedSchedule.scheduleId]);
  }
  deleteRecord():void{
    if(!this.selectedSchedule){
      alert('None record selected. Please select a record and try again!');
      return ;
    }
    if(confirm('You are about to delele a record. Are you sure?')){
      this.scheduleDataService.delete(this.selectedSchedule.scheduleId).subscribe((data)=>{
        if(data.rowsAffected===1){
          //To display toast
          this.messageService.add({severity: 'info', summary: 'Record deleted', detail: this.selectedSchedule.scheduleId+''});
          //To deleted element from an array
          let index = this.scheduleList.findIndex(obj=>obj.scheduleId === this.selectedSchedule.scheduleId);
          this.scheduleList.splice(index,1);
          this.selectedSchedule=null;
        }
      });
    }

  }
}
