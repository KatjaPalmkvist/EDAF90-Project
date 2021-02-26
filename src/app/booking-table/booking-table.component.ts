import {Component} from '@angular/core';

export interface BookingElement {
  position: number;
  time: string;
  isBooked: boolean;
}

const ELEMENT_DATA: BookingElement[] = [
  {position: 1, time: "05-06", isBooked: false},
  {position: 2, time: "06-07", isBooked: false},
  {position: 3, time: "07-08", isBooked: false},
  {position: 4, time: "08-09", isBooked: false},
  {position: 5, time: "10-11", isBooked: true},
  {position: 6, time: "11-12", isBooked: false},
  {position: 7, time: "12-13", isBooked: false},
  {position: 8, time: "13-14", isBooked: false},
  {position: 9, time: "14-15", isBooked: false},
  {position: 10, time: "15-16", isBooked: false},
  {position: 11, time: "16-17", isBooked: false},
  {position: 12, time: "17-18", isBooked: false},
  {position: 13, time: "18-19", isBooked: false},
  {position: 14, time: "19-20", isBooked: false},
  {position: 15, time: "20-21", isBooked: false},
  {position: 16, time: "21-22", isBooked: false},
  {position: 17, time: "22-23", isBooked: false},
];

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
}