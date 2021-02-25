import { Component } from '@angular/core';


@Component({
    
    selector: 'booking-view',
    templateUrl:'./booking-view.component.html',
    styles: [`
    :host {

    }
    `]
  })

  export class BookingViewComponent {
    Arr = Array; //Array type captured in a variable
    num:number = 20;
  }