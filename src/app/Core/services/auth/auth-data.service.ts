import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITokenModel } from 'src/app/user-login/user-login-types';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  //To get logged in user token
  private _userToken: ITokenModel;
  private _userName: string;

  private loginStatus = new BehaviorSubject<boolean>(false);
  loginStatus$ = this.loginStatus.asObservable();
  private appUserRole = new BehaviorSubject<string>("");
  appUserRole$ = this.appUserRole.asObservable();
  private currentUserName = new BehaviorSubject<string>("")
  currentUserName$ = this.currentUserName.asObservable();

  constructor() {
    //To initialize loggin details - if user refresh browser then it fetched login details from local storage
    this.initializeFromSessionStorage();
  }
  public get userToken(): ITokenModel {
    let tokenObj = sessionStorage.getItem('tokenObj');
    this._userToken = JSON.parse(tokenObj);
    return this._userToken;
  }
  public set userToken(value: ITokenModel) {
    this._userToken = value;
    if (value != null) {
      //todo - to validate token - with role and other parameter
      sessionStorage.setItem('tokenObj', JSON.stringify(value));
      sessionStorage.setItem('userRole', value.role);
      sessionStorage.setItem('isAuthenticated', 'true');
      this.loginStatus.next(true);
      this.appUserRole.next(value.role);

    }
    else {
      sessionStorage.removeItem('tokenObj');
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('isAuthenticated');
      this.loginStatus.next(false);
      this.appUserRole.next("");

    }
  }

  public set userName(value: string) {
    this._userName = value;
    sessionStorage.setItem('userName', value);
    this.currentUserName.next(value)
  }

  logout(): void {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('tokenObj');
    // this.isAuthenticated=false;
    this.loginStatus.next(false);
    this.appUserRole.next("");
    this.currentUserName.next("");
  }
  initializeFromSessionStorage(): void {
    console.log('initialize credential from local storage');
    if (sessionStorage.getItem("isAuthenticated") === 'true') {
      this.loginStatus.next(true);
    }
    else {
      this.loginStatus.next(false);
    }
    if (sessionStorage.getItem("userRole") != null) {
      this.appUserRole.next(sessionStorage.getItem("userRole"));

    }
    else {
      this.appUserRole.next("");
    }
    if (sessionStorage.getItem('userName') != null) {
      this.userName = sessionStorage.getItem('userName');
    }
    else {
      this.userName = "";
    }
  }
}
