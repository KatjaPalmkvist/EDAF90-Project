import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //userName: String;
  //password: String;
  //repeat: String;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeat: ['', Validators.required]
    })
  }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.f.userName.value, this.f.email.value, this.f.password.value, this.f.repeat.value);
  }

}
