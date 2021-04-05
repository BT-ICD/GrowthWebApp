/**
 * To validate username already exist or not.
 * Async validators
 * learning reference
 * https://www.youtube.com/watch?v=zKLOzZ3HsYQ
 * https://github.com/t4d-accelebrate-video-shorts/angular-async-validator/blob/master/finish/src/app/app.component.ts
 * https://fireship.io/lessons/async-form-validation-in-firebase-enforce-uniqueness/
 */
import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { AppUserDataService } from 'src/app/Master/users/app-user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserNameExistService {

  constructor() { }
  validateUniqueUserName =(appUserDataService:AppUserDataService)=> (c:FormControl):Observable<ValidationErrors|null>=>{
    if(!c || String(c.value).length===0){
      return of(null);
    }
  
    return appUserDataService.IsUserNameExist(c.value)
      .pipe(
        debounceTime(500),map(data=>{
          console.log('validateUniqueUserName', data);
          if(data.result ===true){
            return {isUserNameExist:true}
          }
          else{
            return null;
          }
        })
      );
  }
}
