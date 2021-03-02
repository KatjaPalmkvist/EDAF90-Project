import {Component} from '@angular/core';

export interface BookingElement {
  position: number;
  time: string;
  isBookedMonday: boolean;
  isBookedTuesday: boolean;
  isBookedWednesday: boolean;
  isBookedThursday: boolean;
  isBookedFriday: boolean;
  isBookedSaturday: boolean;
  isBookedSunday: boolean;
}

export interface Sport {
  sport: string
}

const ELEMENT_DATA: BookingElement[] = [
  {position: 1, time: "05-06", isBookedMonday: false, isBookedTuesday: false, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 2, time: "06-07", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 3, time: "07-08", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 4, time: "08-09", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 5, time: "10-11", isBookedMonday: true, isBookedTuesday: true, isBookedWednesday: true, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 6, time: "11-12", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 7, time: "12-13", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 8, time: "13-14", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 9, time: "14-15", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 10, time: "15-16", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 11, time: "16-17", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 12, time: "17-18", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 13, time: "18-19", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 14, time: "19-20", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 15, time: "20-21", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 16, time: "21-22", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
  {position: 17, time: "22-23", isBookedMonday: false, isBookedTuesday: true, isBookedWednesday: false, isBookedThursday:true, isBookedFriday: false, isBookedSaturday: false, isBookedSunday: true},
];

const ELEMENT_DATA_SPORTS : Sport[] = [{sport: 'Badminton'}, {sport: 'Padel'}, {sport: 'Tennis'}];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example', 
  styleUrls: ['booking-table.component.css'],
  templateUrl: 'booking-table.component.html'
})
export class BookingTableComponent {
  displayedColumns: string[] = ['Tider', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
  dataSource = ELEMENT_DATA;
  sports = ELEMENT_DATA_SPORTS;


  clicked() {

    console.log('hej');
  }
}