import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBatchLookup, IDocumentTypeLookup, ISubjectLookup } from '../types/common-types';
import { DataConstantsService } from './data-constants.service';

@Injectable({
  providedIn: 'root'
})
export class LookupValuesService {

  constructor(private http:HttpClient, private dataConstantsService: DataConstantsService) { }
  subjectLookup():Observable<ISubjectLookup[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Subject/Lookup';
    return this.http.get<ISubjectLookup[]>(url);
  }
  batchLookup():Observable<IBatchLookup[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'batch/Lookup';
    return this.http.get<IBatchLookup[]>(url);
  }
  documentTypeLookup():Observable<IDocumentTypeLookup[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'documenttype/Lookup';
    return this.http.get<IDocumentTypeLookup[]>(url);
  }

}
