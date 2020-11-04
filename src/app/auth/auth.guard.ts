
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad  {

  constructor(private authService: AuthService, private router: Router) {

  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userIsAuthenticated.pipe(take(1),
    switchMap(isAuthenticated => {
      if (!isAuthenticated) {
        console.log(' num 1')
        return this.authService.autoLogin();
      } else {
        console.log(' num 2')
        return of(isAuthenticated);
      }

    }),
     tap(isAuthenticated => {
      console.log(' num 3')
      if (!isAuthenticated) {
        console.log(' num 4')
        this.router.navigateByUrl('auth');
      }
    }));
  }

}
