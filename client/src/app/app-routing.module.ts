import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events/events.component';
import { SpecialComponent } from './special/special.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { ConfidentialComponent } from './confidential/confidential.component';


const routes: Routes = [
  {
     path:'',redirectTo:'/register',pathMatch:'full'
  },
  {
    path:'events',component:EventsComponent,
   // canActivate:[AuthGuard]
  },
  {
    path:'special',component:SpecialComponent,
   canActivate:[AuthGuard]
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'welcome',component:WelcomeComponent
  },
  {
    path:'confidential',component:ConfidentialComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
