import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {rest} from "src/rest";
//rest.register({username: "katja@gmail.com", password: "password"});
//rest.logout();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    console.log(this.f.userName.value, this.f.password.value);
    rest.login({username: this.f.userName.value, 
                password: this.f.password.value}).then(res => console.log(res));
  }

}
