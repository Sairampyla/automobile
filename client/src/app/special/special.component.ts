import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {

   specialEvents = []
  constructor(private _servc:EventService,private route:Router) { }

  ngOnInit(): void {
    this._servc.getSpecial().subscribe(
      res => this.specialEvents =res,
      err => {
        if(err instanceof HttpErrorResponse){
           if(err.status === 401){
         this.route.navigate(['/login'])
           }
        }
      }
    )
  }

}
