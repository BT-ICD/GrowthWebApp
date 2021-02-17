import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAssignment } from 'src/app/Core/types/common-types';

@Component({
  selector: 'app-assignment-view',
  templateUrl: './assignment-view.component.html',
  styleUrls: ['./assignment-view.component.scss']
})
export class AssignmentViewComponent implements OnInit {
@Input() displayDialog:boolean;
@Input() assignment:IAssignment;

@Output() onDialogHide = new EventEmitter();
@Output() onDialogClose = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
   
  }
  onHide():void{
   
    this.displayDialog=false;
    this.onDialogHide.emit();
  }
  closeDialog():void{
    this.displayDialog=false;
    this.onDialogClose.emit();
  }
}
