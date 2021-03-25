import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserDataService } from '../app-user-data.service';
import { IAppUser } from '../iuser-types';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  userForm:FormGroup;
  appUser:IAppUser;
  errorMessage:string;
  constructor(private route: ActivatedRoute, private router:Router, private fb:FormBuilder, private appUserDataService:AppUserDataService) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm():void{
    this.userForm = this.fb.group(
      {
      userName:['',Validators.required],
      email:['',Validators.required],
      userPassword:['',Validators.required],
      confirmPassword:['',Validators.required]
      }
    )
  }
  onSubmit():void{
    if(this.userForm.valid){
      this.appUser ={
        userName:this.userForm.get('userName').value,
        email:this.userForm.get('email').value,
        userPassword:this.userForm.get('userPassword').value
      }
      
      // submit to database
      this.appUserDataService.createUser(this.appUser).subscribe((data)=>{
        if(data){
          if(data.status.toString()=="PASS"){
            //Navigate to user list
          }
        }
      });
      console.log(this.appUser);

    }
  }

}
