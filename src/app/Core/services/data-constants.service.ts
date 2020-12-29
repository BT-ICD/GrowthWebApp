import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataConstantsService {
  readonly BASEAPIURL:string ='https://localhost:44330/api/';

  constructor() { }
}
