import {   Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

import { IDocumentTypeLookup } from 'src/app/Core/types/common-types';
import { AssignmentDocumentDataService } from '../assignment-document-data.service';
import {  IAssignmentDocumentDTODetail } from '../assignment-document-types';

@Component({
  selector: 'app-assignment-document-add',
  templateUrl: './assignment-document-add.component.html',
  styleUrls: ['./assignment-document-add.component.scss']
})
export class AssignmentDocumentAddComponent implements OnInit {
 @Input() display:boolean;
 @Input() documentTypeList:IDocumentTypeLookup[];
 @Input() assignmentId:number;

 @Output() onDialogShow = new EventEmitter();
 @Output() onDialogHide = new EventEmitter();
 @Output() onDialogSubmit = new EventEmitter<IAssignmentDocumentDTODetail>();
 @Output() onDialogCancel = new EventEmitter();

 documentTypeId:number;
 notes:string;
 fileData:File;

 //To get referecen of fileupload control to clear existing selected file
 @ViewChild('pfUpload') pfUpload:ElementRef;
  constructor(private assignmentDocumentDataService:AssignmentDocumentDataService) { }
 
 

  ngOnInit(): void {
    
  }
  onSelect(evetData){
    this.fileData = <File>evetData.files[0];
  }
  onShow(){
    this.notes='';
    this.documentTypeId=-1;
    //To clear selected file - if any existing
    let fUpload = this.pfUpload as unknown as FileUpload;
    fUpload.clear();
    
    
   this.onDialogShow.emit();
  }
  onHide(){
   
    this.onDialogHide.emit();
  }
  saveDocument():void{
    const formData = new FormData();
    formData.append('assignmentId', this.assignmentId+'');
    formData.append('documentTypeId', this.documentTypeId+'');
    formData.append('notes', this.notes);
    formData.append('file', this.fileData);
    this.assignmentDocumentDataService.add(formData).subscribe(data=>{
      this.onDialogSubmit.emit(data);
    })    
    this.display=false;
  }
  cancelDocument():void{
    this.assignmentId=0;
    this.display=false;
    this.onDialogCancel.emit();
  }
  clearFileSelection(data:FileUpload){
   if(data.files.length>0){
    data.clear();
    this.fileData=null;
   }
    
  }
}
