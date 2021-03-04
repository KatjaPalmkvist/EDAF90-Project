import { Component, OnInit } from '@angular/core';
import { rest } from 'src/rest'

@Component({
    selector: 'app-my-page',
    templateUrl: 'my-page.component.html',
    styleUrls: ['my-page.component.css']
})

export class MyPageComponent implements OnInit {
    userBookings: {[date: string]: {[sport: string]: string[]}} = {};
    oldBookings: {[date: string]: {[sport: string]: string[]}} = {};
    
    constructor() { 

    }
    ngOnInit() {
        rest.getUserBookings(rest.getCurrentUser().uid).then((res: any) => {
            const today = new Date();
            today.setHours(0,0,0,0);
            const tmp: {[date: string]: {[sport: string]: string[]}} = res;
            let dates = Object.keys(tmp);
            dates.forEach(date => {
                let date_arr = date.split("-").map(x => Number(x));
                let this_date = new Date(date_arr[0], date_arr[1] - 1, date_arr[2]);
                if (this_date < today) {
                    this.oldBookings[date] = tmp[date];
                } else {
                    this.userBookings[date] = tmp[date];
                }
            })
            

        })
        

    }
}
