import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './shared/authservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
   constructor(private _servc:AuthserviceService,private _route:Router){}
    
     canActivate(): boolean {
       if(this._servc.loggedIn()){
         return true
       }else{
         this._route.navigate(['/login'])
         return false
       }
     }
}
