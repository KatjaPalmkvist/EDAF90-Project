import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {rest} from "src/rest";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public success: boolean;
  
  constructor(private fb: FormBuilder, private router: Router) {
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
                password: this.f.password.value})
                .then(res => {
                  if (res.email !== "") {
                    console.log("Welcome in!");
                    this.success = true;
                    if(history.state["sport"]) {
                      const {sport, time, formattedDate} = history.state;
                      this.router.navigate(['/booking-confirmation', sport, time, formattedDate]);
                    } else {
                      this.router.navigate(['/mypage']);
                    }
                  } else {
                    this.success = false;
                  }
                });
  }

}
