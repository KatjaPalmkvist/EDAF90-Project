import { ActivatedRoute } from '@angular/router';
import {Component} from '@angular/core';


@Component({
    selector: 'booking-confirmation', 
    styleUrls: ['booking-confirmation.component.css'],
    templateUrl: 'booking-confirmation.component.html'
  })

export class BookingConfirmationComponent
{
    constructor(
        private activatedroute: ActivatedRoute
      ) {
        this.activatedroute.params.subscribe(data => {
          console.log(data);
        })
      }

}