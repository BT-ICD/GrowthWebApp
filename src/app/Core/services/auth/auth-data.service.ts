import { Injectable } from '@angular/core';
import { ITokenModel } from 'src/app/user-login/user-login-types';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
//To get logged in user token
  private _userToken: ITokenModel;
//to determine user is authenticated or not
  private _isAuthenticated: boolean;
  public get isAuthenticated(): boolean {
    // return this._isAuthenticated;
    if(sessionStorage.getItem('isAuthenticated'))
    {
      let value = sessionStorage.getItem('isAuthenticated')
      if(value==='true')
          return true;
      else
        return false;
    }
    else{
      return false;
    }
  }
  public set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }
  private _userName: string;
  private _userRole: string;

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
      this.userRole= value.role;
      sessionStorage.setItem('tokenObj',JSON.stringify(value));
      sessionStorage.setItem('userRole', value.role);
      sessionStorage.setItem('isAuthenticated','true');
    }
    else
    {
      this.isAuthenticated = false;
      this.userRole='';
      sessionStorage.removeItem('tokenObj');
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('isAuthenticated');
    }
  }
  public get userName(): string {
    // return this._userName;
    return sessionStorage.getItem('userName');
  }
  public set userName(value: string) {
    this._userName = value;
    sessionStorage.setItem('userName',value);
  }
  public get userRole(): string {
    // return this._userRole;
    return sessionStorage.getItem('userRole');
  }
  public set userRole(value: string) {
    this._userRole = value;
    
  }
}
