import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingTableComponent } from './booking-table/booking-table.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'booking', component: BookingTableComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
