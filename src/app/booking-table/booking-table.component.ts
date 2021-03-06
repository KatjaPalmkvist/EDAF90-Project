import {Component} from '@angular/core';
import {rest, Sport} from "src/rest";
import { Router } from '@angular/router';
const moment = require('moment');
import 'moment/locale/se';


const timeToIndex: any =  { 
  "05:00" : 0,
  "06:00" : 1,
  "07:00" : 2,
  "08:00" : 3,
  "09:00" : 4,
  "10:00" : 5,
  "11:00" : 6,
  "12:00" : 7,
  "13:00" : 8,
  "14:00" : 9,
  "15:00" : 10,
  "16:00" : 11,
  "17:00" : 12,
  "18:00" : 13,
  "19:00" : 14,
  "20:00" : 15,
  "21:00" : 16,
  "22:00" : 17,
};

const weekdaynbrToWeekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const weekdayToWeekdaynbr : any = {
  'Sunday' : 0,
  'Monday' : 1,
  'Tuesday' : 2,
  'Wednesday' : 3,
  'Thursday' : 4,
  'Friday': 5,
  'Saturday' : 6
};

const BASE_ELEMENT_DATA: any[] = [
  {position: 1, time: "05-06"},
  {position: 2, time: "06-07"},
  {position: 3, time: "07-08"},
  {position: 4, time: "08-09"},
  {position: 5, time: "09-10"},
  {position: 6, time: "10-11"},
  {position: 7, time: "11-12"},
  {position: 8, time: "12-13"},
  {position: 9, time: "13-14"},
  {position: 10, time: "14-15"},
  {position: 11, time: "15-16"},
  {position: 12, time: "16-17"},
  {position: 13, time: "17-18"},
  {position: 14, time: "18-19"},
  {position: 15, time: "19-20"},
  {position: 16, time: "20-21"},
  {position: 17, time: "21-22"},
  {position: 18, time: "22-23"},
];

const ELEMENT_DATA_SPORTS : any = [Sport.tennis , Sport.padel , Sport.badminton];

@Component({
  selector: 'table-basic-example', 
  styleUrls: ['booking-table.component.css'],
  templateUrl: 'booking-table.component.html'
})

export class BookingTableComponent {
  displayedColumns: string[] = ['Tider', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
  dataSource = BASE_ELEMENT_DATA;
  activeSport = 0;
  currentWeek = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getBooking(Sport.tennis);
    this.activeSport = 0;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let dateToday = yyyy + '-' + mm + '-' + dd;
    let weekToday = moment(dateToday, 'YYYY-MM-DD',).week();
    this.currentWeek = weekToday;
  }

  toggleCell(time : string, day : string, isBooked : boolean): void {
    if(!isBooked && !this.isOutdated(day)) {
        const date = moment().day(weekdayToWeekdaynbr[day]).week(this.currentWeek);
        const formattedDate = moment(date).format('YYYY-MM-DD');
        if (rest.getCurrentUser().uid) {
          this.router.navigate(['/booking-confirmation', ELEMENT_DATA_SPORTS[this.activeSport], time, formattedDate]);
        } else {
          this.router.navigate(['/login'], {state: {sport: ELEMENT_DATA_SPORTS[this.activeSport], time, formattedDate}})
        }
      }    
  }
  
  clickedTab($event: any): void {
    let sportIndex = $event.index;
    this.getBooking(ELEMENT_DATA_SPORTS[sportIndex]);
    this.activeSport = sportIndex;
  }

  changeWeek(arg :string) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let dateToday = yyyy + '-' + mm + '-' + dd;
    let weekToday = moment(dateToday, 'YYYY-MM-DD',).week();
    console.log(weekToday);

    if (arg === 'inc' && this.currentWeek < 52) {
      this.currentWeek++;
      this.getBooking(ELEMENT_DATA_SPORTS[this.activeSport]);
    } else if (arg==='dec' && this.currentWeek > 1 ) {
      this.currentWeek--;
      this.getBooking(ELEMENT_DATA_SPORTS[this.activeSport]);
    }
  }

  getBooking = async (sport: Sport) => {
    let ELEMENT_DATA: any[] = BASE_ELEMENT_DATA.map(x => Object.assign({}, x));
    rest.getBookings(sport).then((bookings: any) => {
      let typeBookings: { [date: string]: string[] } = bookings;
      Object.keys(typeBookings).forEach(date => {
        if (this.currentWeek === moment(date, 'YYYY-MM-DD',).week()) {
          typeBookings[date].map(time => {
            let index = timeToIndex[time];
            let weekday_nbr = new Date(date).getDay();
            //Get the weekday
            let week_day = weekdaynbrToWeekday[weekday_nbr];
            ELEMENT_DATA[index][week_day] = true;
          })
        }
      });
    }).then(x => {
      this.dataSource = ELEMENT_DATA;
    });
  }

  isOutdated = (day : string) => {
    const date = moment().day(weekdayToWeekdaynbr[day]).week(this.currentWeek);
    const cellDate = moment(date).format('YYYY-MM-DD');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let dateToday = yyyy + '-' + mm + '-' + dd;
    return cellDate < dateToday;
  }

}