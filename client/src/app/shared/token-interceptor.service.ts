import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _servc:AuthserviceService) { }

  intercept(req, next){
  let inject =  this._servc.getToken()
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization:`Bearer ${inject}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
