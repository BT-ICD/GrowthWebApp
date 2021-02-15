import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBatchLookup, IStudentLookup } from 'src/app/Core/types/common-types';
import { IAssignmentAllocationStudents } from 'src/app/Trans/assignment/assignment-types';

@Component({
  selector: 'app-batch-wise-student-list',
  templateUrl: './batch-wise-student-list.component.html',
  styleUrls: ['./batch-wise-student-list.component.scss']
})
export class BatchWiseStudentListComponent implements OnInit {
  @Input() visible:boolean=true;
  @Input()  studentLookup: IStudentLookup[];
  studentList:IStudentLookup[];

  @Input() queTitle:string;
  @Input() batchLookup:IBatchLookup[];


  @Output() onDialogHide=new EventEmitter();
  @Output() onDialogSubmit = new EventEmitter<IAssignmentAllocationStudents>();
  selectedBatch:number;
  selectedStudents:IStudentLookup[];
  constructor() { }
  ngOnInit(): void {
  }
  onHide():void{
    this.onDialogHide.emit();
  }
  onSubmit():void{
    if(this.selectedStudents){
      let selectedStudentId:string='';
      let i:number;
      if(this.selectedStudents.length != this.studentList.length){
        this.selectedStudents.forEach((obj)=>{
          selectedStudentId+="," + obj.studentId
        })
        selectedStudentId = selectedStudentId.substr(1);
      }
      let data : IAssignmentAllocationStudents={
        batchId:this.selectedBatch,
        studentIds:selectedStudentId
      };
      this.onDialogSubmit.emit(data);
      this.visible=false;
    }
    else{
      alert('None student selected. Select student and try again...');
    }
    
  }
  onBatchChanged(event){
    this.selectedStudents?.splice(0,this.selectedStudents.length);
    this.studentList = this.studentLookup.filter((obj)=>obj.batchId==event.value);
    
  }
}
