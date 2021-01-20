import { Injectable } from '@angular/core';
import { ITokenModel } from 'src/app/user-login/user-login-types';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
//To get logged in user token
  private _userToken: ITokenModel;
//to determine user is authenticated or not
isAuthenticated:boolean;
  private _userName: string;
  



  constructor() { }
  public get userToken(): ITokenModel {
    let tokenObj = sessionStorage.getItem('tokenObj');
    this._userToken = JSON.parse(tokenObj);
    return this._userToken;
  }
  public set userToken(value: ITokenModel) {
    this._userToken = value;
    if(value!=null){
      //todo - to validate token - with role and other parameter
      this.isAuthenticated = true;
      sessionStorage.setItem('tokenObj',JSON.stringify(value));
    }
    else
    {
      this.isAuthenticated = false;
      sessionStorage.removeItem('tokenObj');
    }
  }
  public get userName(): string {
    return this._userName;
  }
  public set userName(value: string) {
    this._userName = value;
  }
  
}
