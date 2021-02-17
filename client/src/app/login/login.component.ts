import { Component, OnInit, Input } from '@angular/core';
import { AuthserviceService } from '../shared/authservice.service';
import { Router } from '@angular/router';
import {Socialusers} from '../shared/socialUsers';
import {GoogleLoginProvider,FacebookLoginProvider,AuthService, SocialUser} from 'angularx-social-login';
import{SocialLoginModule,AuthServiceConfig} from 'angularx-social-login';
import { SocialLoginService } from '../shared/sociallogin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   socialusers = new Socialusers();
  @Input() loginUserData = {email:"",password:""}
  constructor(private _servc:AuthserviceService,private _router:Router,
    public oauth:AuthService,public scLoginService:SocialLoginService
  ) { }

  ngOnInit(): void {
  }
  // loginData(){
  //   console.log(this.loginUserData)
  //   this._servc.loginUser(this.loginUserData).subscribe(
  //      res => {console.log(res)
  //       if(res.success == true){
  //      localStorage.setItem('token',res.token)
  //      window.alert('login successfully')
  //       this._router.navigate(['/special'])
  //       }else{
  //         window.alert('invalid credentails')
  //         this._router.navigate(['/events'])
  //       }
  //     },
  //   )}
  loginData(){
    console.log(this.loginUserData)
    this._servc.loginUser(this.loginUserData).subscribe(
       res=>{
       localStorage.setItem('token',res.token)
       window.alert('login successfully')
        this._router.navigate(['/special'])
       },

          err=> window.alert('wrong credentails')
    )}

    onGoto(){
      this._router.navigate(['/register'])
    }  

       socialSignIn(socialProvider:string){
         let socialPlatformProvider;
         if(socialProvider === 'google'){
           socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

         }
         this.oauth.signIn(socialPlatformProvider).then(Socialusers =>{
           console.log(socialProvider,this.socialusers)
           this.Savesresponse()
           
         })
       }
      
         Savesresponse(socialusers:Socialusers){
                this.scLoginService,this.Savesresponse(socialusers).this.service.function
                  .subscribe(arg => this.property = arg);
                
         }

   }

    // facebookLogin(){
    //   this.socail.signIn(FacebookLoginProvider.PROVIDER_ID).then(res =>{
    //     console.log(res)
    //     if(res){
    //         this._servc.loginfbpage(res).subscribe(data =>{
    //           console.log(data);
    //           localStorage.setItem('token','asadf')
    //           this._router.navigate(['/special'])
    //         })


    //       // window.alert('login successfully')
    //       }
      // })
      // }



    // googleLogin(){
    //   this.socail.signIn(GoogleLoginProvider.PROVIDER_ID).then(res =>{
    //     console.log(res)
    //     this._router.navigate(['/special'])
    //       window.alert('login successfully')
    //   })
    // }






