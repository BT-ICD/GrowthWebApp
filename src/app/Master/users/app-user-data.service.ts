import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConstantsService } from 'src/app/Core/services/data-constants.service';
import { IBooleanResult, IDataUpdateResponseDTO } from 'src/app/Core/types/common-types';
import { IAppUser, IAppUserDTOList } from './iuser-types';

@Injectable({
  providedIn: 'root'
})
export class AppUserDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getList():Observable<IAppUserDTOList[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + 'AppUser/GetList';
    return this.http.get<IAppUserDTOList[]>(url);
  }
  IsUserNameExist(userName:string):Observable<IBooleanResult>{
    console.log('service called IsUserNameExist');
    const url:string = this.dataConstantsService.BASEAPIURL + 'AppUser/IsUserNameExist/' + userName;
    return this.http.get<IBooleanResult>(url);
  }
  createUser(appUser:IAppUser):Observable<IDataUpdateResponseDTO>{
    const url:string = this.dataConstantsService.BASEAPIURL +'AppUser/CreateUser';
    return this.http.post<IDataUpdateResponseDTO>(url,appUser);
  }
}
