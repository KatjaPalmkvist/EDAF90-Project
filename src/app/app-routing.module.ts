import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingTableComponent } from './booking-table/booking-table.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyPageComponent } from './my-page/my-page.component';
import { BookingConfirmationComponent} from './booking-confirmation/booking-confirmation.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'booking', component: BookingTableComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'mypage', component: MyPageComponent},
  {path: 'booking-confirmation/:sport/:time/:day', component: BookingConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
