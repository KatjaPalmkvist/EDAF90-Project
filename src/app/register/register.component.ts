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
    console.log(this.f.userName.value, this.f.password.value, this.f.repeat.value);
    if(this.f.password.value === this.f.repeat.value) {
      this.match = true;
      rest.register({username: this.f.userName.value, 
        password: this.f.password.value}).then(res => {
          if (res) {
            this.router.navigate(['/mypage']);
          } 
        });
    } else {
      this.match = false;
      //this.f.password.setValue("");
      //this.f.repeat.setValue("");
    }    
  }

}
