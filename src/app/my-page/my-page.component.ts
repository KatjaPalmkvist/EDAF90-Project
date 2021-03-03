import { Component, OnInit } from '@angular/core';
import { rest, Sport } from 'src/rest'

@Component({
    selector: 'app-my-page',
    templateUrl: 'my-page.component.html',
    styleUrls: ['my-page.component.css']
})

export class MyPageComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        console.log(rest.getCurrentUser())
     }
}