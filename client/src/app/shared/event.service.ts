import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // private _eventsurl:string="https://backend-auth1.herokuapp.com/api/events";
  // private _specialurl:string="https://backend-auth1.herokuapp.com/api/events";

  private _eventsurl:string="http://localhost:3000/api/events";
  private _specialurl:string="http://localhost:3000/api/events";

  constructor(private _http:HttpClient) { }

    getEvents(){
      return this._http.get<any>(this._eventsurl)
    }
    getSpecial(){
      return this._http.get<any>(this._specialurl)
    }
}
