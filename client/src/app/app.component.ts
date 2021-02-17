import { Component } from '@angular/core';
import { AuthserviceService } from './shared/authservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'automobile';
  constructor(public _servc:AuthserviceService){}
}
