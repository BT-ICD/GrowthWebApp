import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {

  constructor() { }
  //To convert date to particular string format yyyy-MM-dd. This allows us to bind date to form control with form builder
  dateToString(dateToConvert:Date):string{
    let datePipe = new DatePipe('en-US');
    let ansDate= datePipe.transform(dateToConvert,'yyyy-MM-dd');
    return ansDate;
  }
   //To convert date to particular string format yyyy-MM-dd hh:mm AM/PM. This allows us to bind date to form control with form builder with date and time
   dateToDateTimeString(dateToConvert:Date):string{
    let datePipe = new DatePipe('en-US');
    let ansDate= datePipe.transform(dateToConvert,'yyyy-MM-dd hh:mm: a');
    return ansDate;
  }

  getCurrentDate():string{
    let datePipe = new DatePipe('en-US');
    let ansDate= datePipe.transform(new Date(),'yyyy-MM-dd');
    return ansDate;
  }
}
