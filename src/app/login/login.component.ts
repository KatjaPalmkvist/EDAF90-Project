import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
  // loading = false;
  // submitted = false;
  // returnUrl: string;
  // error = '';
  userName: String;
  password: String;

  constructor() { }

  ngOnInit(): void {
    
  }

  login(): void {
    console.log(this.userName, this.password);
  }

}
