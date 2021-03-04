import { ActivatedRoute, Router } from '@angular/router';
import {Component} from '@angular/core';
import { rest, Sport} from 'src/rest'
const moment = require('moment');

const getSport : any = {'Tennis': Sport.tennis , 'Padel' : Sport.padel , 'Badminton' : Sport.badminton};

@Component({
    selector: 'booking-confirmation', 
    styleUrls: ['booking-confirmation.component.css'],
    templateUrl: 'booking-confirmation.component.html'
})

export class BookingConfirmationComponent {
    date = '';
    time = '';
    sport = '';
    constructor( private activatedroute: ActivatedRoute, private router: Router) {
        
        let sport = "";
        this.activatedroute.params.subscribe(data => {
          this.date = data.date;
          this.time = data.time;
          sport = data.sport;
          this.sport = sport[0].toUpperCase() + sport.substring(1);
        });
        if (!moment(this.date, 'YYYY-MM-DD', true).isValid() || !moment(this.time, 'HH-HH', true).isValid() || !Object.keys(Sport).includes(sport)){
          router.navigate(['/page-not-found']);
        }
    }

    abortBooking() {
      this.router.navigate(['/booking']);
    }

    confirmBooking () {
      let currentUserId = rest.getCurrentUser().uid;
      let adjustedTime = this.time.substring(0,2) + ':00';
      rest.setBooking(currentUserId, {date : this.date, time : adjustedTime, sport: getSport[this.sport]})
        .then(x => this.router.navigate(['/mypage']));
      ;
    }
    

}