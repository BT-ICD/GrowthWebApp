import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService} from 'primeng/api';
import { SubjectDataService } from '../subject-data.service';
import { ISubjectList, SubjectListResolver } from '../subject-types';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
  providers:[MessageService]
})
export class SubjectListComponent implements OnInit {
  subjectListResolver: SubjectListResolver;
  private _subjects: ISubjectList[];
  public get subjects(): ISubjectList[] {
    //let result = this._subjects.filter(obj=>obj.isDeleted===false); 
    return this._subjects; //result //this._subjects;
  }
  public set subjects(value: ISubjectList[]) {
    this._subjects = value;
  }
  selectedSubject:ISubjectList;
  errorMessage:string;
  cols:any[];
  constructor(private route:ActivatedRoute, private router:Router, private subjectDataService:SubjectDataService, private messageService:MessageService) { }

  ngOnInit(): void {
    
    this.defineColumnsForList();
    this.route.data.subscribe((data)=>{
      this.subjectListResolver = data['resolveData'];
      this.errorMessage = this.subjectListResolver.error;
      this.onSubjectListRetrieved(this.subjectListResolver.subjects); 
    })
  }
  //To define list of columns to display into table
  private defineColumnsForList() {
    this.cols = [
      { field: 'subjectId', header: 'Id', width:'10%' },
      { field: 'name', header: 'Name' }
    ];
  }

  onSubjectListRetrieved(data:ISubjectList[]){
    this.subjects = data;
  }
  editRecord():void{
    if(!this.selectedSubject){
      alert('None record selected. Please select a record and try again!');
      return ;
    }
    this.router.navigate(['/subject', this.selectedSubject.subjectId,'edit']);
    
  }
  deleteRecord(){
    if(!this.selectedSubject){
      alert('None record selected. Please select a record and try again!');
      return ;
    }
    if(confirm('You are about to delele a record. Are you sure?')){
      this.subjectDataService.delete(this.selectedSubject.subjectId).subscribe((data)=>{
        if(data.rowsAffected===1){
          //To display toast
          this.messageService.add({severity: 'info', summary: 'Record deleted', detail: this.selectedSubject.name});
          //To deleted element from an array
          let index = this.subjects.findIndex(obj=>obj.subjectId === this.selectedSubject.subjectId);
          this.subjects.splice(index,1);
          this.selectedSubject=null;
        }
      });
    }
  }
  ///Navigate to chapter list component
  moveToChapterList():void{
    if(!this.selectedSubject){
      alert('None record selected. Please select a record and try again!');
      return ;
    }
    this.router.navigate(['/chapter', this.selectedSubject.subjectId, this.selectedSubject.name]);
  }
}
