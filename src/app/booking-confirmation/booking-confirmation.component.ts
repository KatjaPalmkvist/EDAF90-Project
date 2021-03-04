import { ActivatedRoute } from '@angular/router';
import {Component} from '@angular/core';


const weekDict : any = {
  'Monday' : 'Måndag',
  'Tuesday' : 'Tisdag',
  'Wednesday' : 'Onsdag',
  'Thursday' : 'Torsdag',
  'Friday' : 'Fredag',
  'Saturday' : 'Lördag',
  'Sunday' : 'Söndag',
}

@Component({
    selector: 'booking-confirmation', 
    styleUrls: ['booking-confirmation.component.css'],
    templateUrl: 'booking-confirmation.component.html'
})

export class BookingConfirmationComponent {
    day = '';
    time = '';
    sport = '';
    
    constructor( private activatedroute: ActivatedRoute) {
        this.activatedroute.params.subscribe(data => {
          this.day = weekDict[data.day];
          this.time = data.time;
          let sport = data.sport;
          this.sport = sport[0].toUpperCase() + sport.substring(1);
        });
    }

    
    

}