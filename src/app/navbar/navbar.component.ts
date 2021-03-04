import { Component } from '@angular/core';
import {rest} from 'src/rest';

@Component({
    selector:'navbar',
    templateUrl:'./navbar.component.html'
    })

export class NavigationBarComponent {
    isLoggedIn: boolean;

    constructor() { 
        this.isLoggedIn = localStorage.getItem("isLoggedIn") ? true : false;

        rest.userListener((userStatus) =>{
            this.isLoggedIn = userStatus;
        })
    }

    logout(){
        rest.logout();
    }
}