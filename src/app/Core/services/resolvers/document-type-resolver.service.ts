import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map } from 'rxjs/operators';

import { IDocumentTypeLookupResolver } from '../../types/common-types';
import { LookupValuesService } from '../lookup-values.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeResolverService implements Resolve<IDocumentTypeLookupResolver> {

  constructor(private lookupValuesService:LookupValuesService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IDocumentTypeLookupResolver | Observable<IDocumentTypeLookupResolver> | Promise<IDocumentTypeLookupResolver> {
    return this.lookupValuesService.documentTypeLookup()
    .pipe(
      map((data)=>({documentTypeList:data, error:null})),
      catchError((err)=>{
        const message:string = `Error in retrieval ${err.statusText}`;
        return of({documentTypeList:null,error:message});
      })
    );
  }
}
