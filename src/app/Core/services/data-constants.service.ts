import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataConstantsService {
  //Local IIS .NET
  readonly BASEAPIURL:string ='https://localhost:44330/api/';
  //Deployed on IIS of Local Machine for ICD Students live session data
  // readonly BASEAPIURL:string ='http://localhost:7460/API/';
  constructor() { }
}
