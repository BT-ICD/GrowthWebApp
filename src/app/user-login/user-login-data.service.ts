import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from '../Core/services/data-constants.service';
import { ILoginModel, ITokenModel } from './user-login-types';

@Injectable({
  providedIn: 'root'
})
export class UserLoginDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  authenticateUser(loginModel:ILoginModel):Observable<ITokenModel>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'Authenticate/Login';
    return this.http.post<ITokenModel> (url,loginModel);
  }
}
