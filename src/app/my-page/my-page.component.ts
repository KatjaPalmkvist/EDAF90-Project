import { Component, OnInit } from '@angular/core';
import { rest, Sport } from 'src/rest'

@Component({
    selector: 'app-my-page',
    templateUrl: 'my-page.component.html',
    styleUrls: ['my-page.component.css']
})

export class MyPageComponent implements OnInit {
    userBookings: {[date: string]: {[sport: string]: string[]}};
    
    constructor() { 
        console.log(rest.getCurrentUser())
    }
    ngOnInit() {
        rest.getUserBookings(rest.getCurrentUser().uid).then((res: any) => {
            this.userBookings = res;

        })
        

    }
}

function hej(date: string, time: string, sport: Sport) {
    return `<div>${date}</div>`
}