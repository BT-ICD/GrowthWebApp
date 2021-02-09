import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IDocumentTypeLookup } from 'src/app/Core/types/common-types';
import { AssignmentDocumentDataService } from '../assignment-document-data.service';
import { IAssignmentDocumentDTODetail, IAssignmentDocumentDTOList, IAssignmentDocumentListResolve } from '../assignment-document-types';

@Component({
  selector: 'app-assignment-document-list',
  templateUrl: './assignment-document-list.component.html',
  styleUrls: ['./assignment-document-list.component.scss', './tabledemo.scss'],
  providers: [MessageService]
})
export class AssignmentDocumentListComponent implements OnInit, OnDestroy {
  iAssignmentDocumentListResolve: IAssignmentDocumentListResolve;
  assignmentDocList: IAssignmentDocumentDTOList[];
  selectedAssignmentDoc: IAssignmentDocumentDTOList;
  errorMessage: string;
  routeDataSubscription: Subscription;
  deleteRecSub: Subscription;
  refreshDataSub: Subscription;
  cols: any[];
  documentTypeList: IDocumentTypeLookup[]
  displayAddDialog: boolean;
  queTitle: string;
  subjectName: string;
  assignmentId: number;


  constructor(private route: ActivatedRoute, private assignmentDocumentDataService: AssignmentDocumentDataService, private router: Router, private dataConstantsService: DataConstantsService, private messageService: MessageService) { }



  ngOnInit(): void {
    this.initializeColumns();

    this.routeDataSubscription = this.route.data.subscribe((data) => {
      this.iAssignmentDocumentListResolve = data['resolveData'];
      this.assignmentDocList = this.iAssignmentDocumentListResolve.assignmentDocList;
      this.queTitle = this.iAssignmentDocumentListResolve.queTitle;
      this.assignmentId= this.iAssignmentDocumentListResolve.assignmentId;
      this.subjectName = this.iAssignmentDocumentListResolve.subjectName;
      if (this.iAssignmentDocumentListResolve.error) {
        this.errorMessage = this.iAssignmentDocumentListResolve.error;
      }

      let resolveDocTypes = data['resolveDocTypes'];
      this.documentTypeList = resolveDocTypes.documentTypeList;
      if (resolveDocTypes.error) {
        if (this.errorMessage != "") {
          this.errorMessage += ' ' + resolveDocTypes.error;
        }
        else {
          this.errorMessage = resolveDocTypes.error;
        }
      }
    });
  }
  initializeColumns(): void {
    this.cols = [
      { field: 'assignmentDocumentId', header: 'Id', width: '07%' },
      { field: 'documentTypeName', header: 'Type', width: '20%' },
      { field: 'notes', header: 'Notes', width: '60%' }
    ]
  }
  deleteRecord(): void {
    if (!this.selectedAssignmentDoc) {
      alert('None record selected, please select record to delete.');
      return;
    }
    if(confirm('You are about to delete a record. Are you sure?')){
    this.deleteRecSub = this.assignmentDocumentDataService.delete(this.selectedAssignmentDoc.assignmentDocumentId).subscribe((data) => {
      if (data.rowsAffected == 1) {
        let index = this.assignmentDocList.findIndex(obj => obj.assignmentDocumentId === this.selectedAssignmentDoc.assignmentDocumentId);
        this.assignmentDocList.splice(index, 1);
        this.messageService.add({ severity: 'info', summary: 'Record deleted', detail: 'Assignment Document deleted:' + this.selectedAssignmentDoc.assignmentDocumentId });
        this.selectedAssignmentDoc = null;
      }
    })
  }
  }
  documentAdd(): void {
    this.displayAddDialog = true;
  }
  downloadButtonClick(id: number) {
    const url: string = this.dataConstantsService.BASEAPIURL + 'AssignmentDocument/download/' + id;
    console.log(url);
    const link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.setAttribute('href', url);
    document.body.append(link);
    link.click();
    link.remove();

  }
  onDialogHide(): void {

    this.displayAddDialog = false;
  }
  onDialogSubmit(dtoSubmitted: IAssignmentDocumentDTODetail): void {
    this.displayAddDialog = false;
    //To refresh list of documents
    this.refreshDataSub = this.assignmentDocumentDataService.getList(this.assignmentId).subscribe((data) => {
      this.assignmentDocList = data;
    })
  }
  onDialogCancel(): void {
    this.displayAddDialog = false;
    
  }

  ngOnDestroy(): void {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
    if (this.refreshDataSub) {
      this.refreshDataSub.unsubscribe();
    }
    if (this.deleteRecSub) {
      this.deleteRecSub.unsubscribe();
    }
  }
}
