import { Component } from '@angular/core';
import {rest} from 'src/rest';

@Component({
    selector:'navbar',
    templateUrl:'./navbar.component.html'
    })

export class NavigationBarComponent {
    isLoggedIn: boolean;

    constructor() { 
        rest.isLoggedIn().then(res => {
            this.isLoggedIn = res;
        })
        rest.userListener((userStatus) =>{
            this.isLoggedIn = userStatus;
        })
    }

    logout(){
        rest.logout();
    }
}