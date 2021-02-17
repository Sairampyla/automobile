import { Component, OnInit, Input } from '@angular/core';
import { AuthserviceService } from '../shared/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  token:any;

  @Input() registeredUserData = {email:"",password:""}

  constructor(private _service:AuthserviceService,private _route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
   // console.log(this.registeredUserData)
     this._service.registeredUser(this.registeredUserData).subscribe(
      res => {console.log(res)
       if(res.success == true){
         localStorage.setItem('token',res.token)
         window.alert('Registration succeedd')
         this._route.navigate(['/events'])
       }else{
          window.alert('mail already exists pls login.!!')
          this._route.navigate(['/login'])
       }
      },
     )
  }
}
