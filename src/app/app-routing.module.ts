import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingTableComponent } from './booking-table/booking-table.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyPageComponent } from './my-page/my-page.component';
import { BookingConfirmationComponent} from './booking-confirmation/booking-confirmation.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginGuard } from './shared/login.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'booking', component: BookingTableComponent},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  {path: 'booking-confirmation/:sport/:time/:day', component: BookingConfirmationComponent},
  {path: 'mypage', component: MyPageComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomePageComponent}, 
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'page-not-found', component: PageNotFoundComponent}, 
  {path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
