import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { UserNameExistService } from 'src/app/Core/services/custom-validators/user-name-exist.service';
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
  constructor(private route: ActivatedRoute, private router:Router, private fb:FormBuilder, private appUserDataService:AppUserDataService, private userNameExistService:UserNameExistService) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm():void{
    this.userForm = this.fb.group(
      {
        userName:['',[Validators.required, Validators.minLength(5)],[this.userNameExistService.validateUniqueUserName(this.appUserDataService)]],
        email:['',[Validators.required,Validators.email]],
        passwordGroup:this.fb.group({
          userPassword:['',Validators.required],
          confirmPassword:['',Validators.required]
        }, {validator:this.passwordMatcher})
      }
    )
  }
  onSubmit():void{
    console.log(this.userForm.valid);
    if(this.userForm.valid){
      this.appUser ={
        userName:this.userForm.get('userName').value,
        email:this.userForm.get('email').value,
        userPassword:this.userForm.get('passwordGroup').get('userPassword').value
      }
     
      // submit to database
      this.appUserDataService.createUser(this.appUser).subscribe((data)=>{
        if(data){
          if(data.status.toString()=="PASS"){
            this.router.navigate(['userlist']);
          }
        }
      });
    }
  }
  passwordMatcher(c:AbstractControl):{[key:string]:boolean}|null{
    const passwordControl = c.get('userPassword');
    const confirmPasswordControl = c.get('confirmPassword');
    //if not yet tuouched
    if(passwordControl.pristine || confirmPasswordControl.pristine){
      return null;
    }
    if(passwordControl.value ===confirmPasswordControl.value){
      return null;
    }
    return {'match':true};
  }
}
