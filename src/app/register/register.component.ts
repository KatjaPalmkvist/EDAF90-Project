import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName: String;
  password: String;
  repeat: String;

  constructor() { }

  ngOnInit(): void {
  }

  register(): void {
    console.log(this.userName, this.password, this.repeat);
  }

}