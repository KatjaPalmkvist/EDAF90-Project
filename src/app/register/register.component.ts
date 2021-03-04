import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {rest} from "src/rest";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public match: boolean;
  userExists: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.f.password.value === this.f.repeat.value) {
      this.match = true;
      rest.register({username: this.f.userName.value, 
        password: this.f.password.value}).then(res => {
          console.log(res)
          if (res.email) {
            this.router.navigate(['/mypage']);
          } else {
            console.log("User already exist");
            this.userExists = true;
          }
        });
    } else {
      this.match = false;
      //this.f.password.setValue("");
      //this.f.repeat.setValue("");
    }    
  }

}
