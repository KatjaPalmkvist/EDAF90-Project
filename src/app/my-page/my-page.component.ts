import { Component, OnInit } from '@angular/core';
import { rest, Sport } from 'src/rest'
//rest.login({username: "pingvinkatten@gmail.com", password: "Kaffebanan"});
//rest.logout()

@Component({
    selector: 'app-my-page',
    templateUrl: 'my-page.component.html',
    styleUrls: ['my-page.component.css']
})

export class MyPageComponent implements OnInit {
    userBookings: {[date: string]: {[sport: string]: string[]}};
    
    constructor() { 

    }
    
    ngOnInit() {
        rest.getUserBookings(rest.getCurrentUser().uid).then((res: any) => {
            this.userBookings = res;

        })
        

    }
}
