/**
 * Learning Reference about HTTP Interceptor - 
 * https://blog.angulartraining.com/http-interceptors-in-angular-61dcf80b6bdd
 * https://github.com/ngx-translate/core/issues/1050
 */

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDataService } from '../auth/auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authDataService :AuthDataService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authDataService.userToken;
    let authReq = req.clone();
    if(token!=null){
      const authString:string= `Bearer ${token.token}`;
      const headers = authReq.headers.set('Authorization',authString);
      authReq = req.clone({headers});
    }
    return next.handle(authReq);
  }
}
