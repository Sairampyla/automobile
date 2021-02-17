import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  // private _regurl:string = "https://backend-auth1.herokuapp.com/api/register";
  // private _logurl:string = "https://backend-auth1.herokuapp.com/api/login";

  private _regurl:string = "http://localhost:3000/api/register";
  private _logurl:string = "http://localhost:3000/api/login";
  constructor(private _http:HttpClient,private route:Router) {

   }


  registeredUser(user){
   return this._http.post<any>(this._regurl,user)
  }

  loginUser(user){
    return this._http.post<any>(this._logurl,user)
  }


  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.route.navigate(['/login'])

  }
  getToken(){
    return localStorage.getItem('token')
  }


}

