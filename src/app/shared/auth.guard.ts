import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { rest } from 'src/rest';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    
    constructor(
        public router: Router

    ){ }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return rest.isLoggedIn().then(res => {
                if (!res) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            })
        }
    
}