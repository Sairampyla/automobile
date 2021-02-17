import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule,HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {GoogleLoginProvider,FacebookLoginProvider,AuthService} from 'angularx-social-login';
import{SocialLoginModule,AuthServiceConfig} from 'angularx-social-login';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialComponent } from './special/special.component';
import { AuthserviceService } from './shared/authservice.service';
import { EventService } from './shared/event.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './shared/token-interceptor.service';

export function socialConfigs(){
  const config = new AuthServiceConfig([
    {
      id:FacebookLoginProvider.PROVIDER_ID,
      provider:new FacebookLoginProvider('419167992777-2it1rgvs25002q7ta1jhuuhkhv972j1g.apps.googleusercontent.com')
    }
  ]);
  return config
}
 


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthserviceService,{
    provide:AuthServiceConfig,
    useFactory:socialConfigs
  },EventService,
    ,AuthGuard,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
