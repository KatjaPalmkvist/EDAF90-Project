import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, NavigationEnd, Router } from '@angular/router';
import { rest, Sport } from 'src/rest'

@Component({
    selector: 'app-my-page',
    templateUrl: 'my-page.component.html',
    styleUrls: ['my-page.component.css']
})

export class MyPageComponent implements OnInit, CanActivate {
    constructor(private router: Router, private route: ActivatedRoute) { 
        
    }
    ngOnInit() {

    }

    canActivate() {

        if(!rest.getCurrentUser().uid) {
            console.log("We are here baby!")
            this.router.navigate(["/login"], {relativeTo: this.route});
            return false;
        }
        console.log("Fuck you man")
        return true;
    }
}