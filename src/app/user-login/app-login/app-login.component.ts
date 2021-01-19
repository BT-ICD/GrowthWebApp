import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDataService } from '../user-login-data.service';
import { ILoginModel, ITokenModel } from '../user-login-types';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {
  loginForm:FormGroup;
  errorMessage:string;
  
  constructor(private router:Router, private userLoginDataService:UserLoginDataService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm():void{
    this.loginForm = this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }
  onSubmit():void{
    if(this.loginForm.valid){
      let loginModel:ILoginModel;
      loginModel = Object.assign(this.loginForm.value);
      this.userLoginDataService.authenticateUser(loginModel).subscribe({
        next:(data)=>this.onLoginSuccess(data),
        error:(err)=>this.onLoginError(err)
      });
    }
  }
  onLoginSuccess(userToken:ITokenModel){
    this.errorMessage='';
    console.log(userToken);
  }
  onLoginError(err){
    if(err.status==401){
      this.errorMessage='Invalid user name or password. Please enter valid user name and password'
    }
    else{
      this.errorMessage = err.statusText;
    }
  }
}
