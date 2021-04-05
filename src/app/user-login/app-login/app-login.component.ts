import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDataService } from 'src/app/Core/services/auth/auth-data.service';
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
  displayLoader:boolean;
  loginModel:ILoginModel;
  constructor(private router:Router, private userLoginDataService:UserLoginDataService, private fb:FormBuilder, private authDataService:AuthDataService) { }

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
      
      this.loginModel = Object.assign(this.loginForm.value);
      this.displayLoader=true;
      this.userLoginDataService.authenticateUser(this.loginModel).subscribe({
        next:(data)=>this.onLoginSuccess(data),
        error:(err)=>this.onLoginError(err)
      });
      

    }
  }
  onLoginSuccess(userToken:ITokenModel){
    this.errorMessage='';
    this.authDataService.userToken = userToken;
    this.authDataService.userName=this.loginModel.userName;
    this.router.navigate(['/']);
    this.displayLoader=false;
  }
  onLoginError(err){
    if(err.status==401){
      this.errorMessage='Invalid user name or password. Please enter valid user name and password'
    }
    else{
      this.errorMessage = err.statusText;
    }
    this.authDataService.userToken=null;
    this.authDataService.userName='';
    this.displayLoader=false;
  }
}
