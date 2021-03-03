import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {rest} from "src/rest";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeat: ['', Validators.required]
    })
  }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.f.userName.value, this.f.password.value, this.f.repeat.value);
    if(this.f.password.value === this.f.repeat.value) {
      rest.register({username: this.f.userName.value, 
        password: this.f.password.value}).then(res => console.log(res));
    } else {
      console.log("!!!!Passwords does not match!!!!");
    }    
  }

}
