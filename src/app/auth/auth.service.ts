import * as jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';


export interface AuthResponseData {
  user_id: string;
  username: string;
  email: string;
  token: string;
  expiresIn: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usertoken = new BehaviorSubject<User>(null);

  // tslint:disable-next-line: variable-name
  private _user = new BehaviorSubject<User>(null);


  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;
  // tslint:disable-next-line: variable-name
  private activeLogoutTimer: any;

  get UserId() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.user_id;
      } else {
        return null;
      }
    }));
  }
  get userName() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        console.log('this si username', user.username);
        return user.username;
      } else {
        return null;
      }
    }));
  }

  get userToken() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.token;
      } else {
        return null;
      }
    }));
  }

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
        if (user) {
          console.log('its true')
          return  !!user.token;
        } else {
          console.log('its false')
          return false;

        }

      })
    );
  }

  get userTok() {
    return this._user.asObservable().pipe(map(user => {
        if (user) {
          console.log('this  is user', user);
          return  user.token;
        } else {
          return null;
        }

      })
    );
  }

  get User_username() {
    return this._user.asObservable().pipe(map(userRes => {
      console.log(userRes);
      return userRes.username;
    }));
  }

  async returnUserId() {
    const { value } = await Plugins.Storage.get({ key : 'authData'}) ;
    const dit = JSON.parse(value);
    const dat = dit.user_id;
    return dat;
  }

  async returnUsername() {
    const { value } = await Plugins.Storage.get({ key : 'authData'}) ;
    const dit = JSON.parse(value);
    const dat = dit.username;
    return dat;
  }


  async returnUserToken() {
    const { value } = await Plugins.Storage.get({ key : 'authData'}) ;
    const dic = JSON.parse(value);
    const dicToken = dic.token;
    console.log('for auth token', dicToken);

    return dicToken;
  }

  constructor(private http: HttpClient) { }

  autoLogin() {
    return from (localStorage.getItem( 'authData'))
      .pipe(map(storedData => {
         if (!storedData || !storedData) {
           return null;
         }
         const parsedData = JSON .parse(storedData) as
         {user_Id: string; username: string;  email: string; token: string };
         if (!storedData ) {
           return null;
         }
         const user = new User(
          parsedData.user_Id,
          parsedData.username,
          parsedData.email,
          parsedData.token,
         );
         return user;
      }),
      tap(user => {
        if (user) {

          this._user.next(user);
          //this.autoLogout(user.tokenDuration);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  signup(email: string, password: string, username: string ) {
     return this.http.post<AuthResponseData>
     ('https://film-raters.herokuapp.com/account/signup', { email, password, username }
    ).pipe(tap(this.setUserData.bind(this)));
  }

  login(username: string, password: string) {
     return this.http.post<AuthResponseData>('https://film-raters.herokuapp.com/account/login', {username, password}
    ).pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    localStorage.removeItem('authData');
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) { return null; }
    const date  = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  getUserId(token: string) {
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    return userId;
  }

  private setUserData(userData: AuthResponseData) {
    console.log('this is detail', userData.token);
    const oneToken = JSON.stringify(userData);
    const parsedToken = JSON.parse(oneToken);
    const theToken = parsedToken.token;

    const theUsername = parsedToken.username;
    console.log('this is detail', theUsername);
    const theEmail = parsedToken.email;
    const theUserId = parsedToken.id;

    const user = new User(
      userData.user_id = theUserId,
      userData.username = theUsername,
      userData.email = theEmail,
      userData.token = theToken,
    );
    this._user.next(user);
    //this.autoLogout(user.tokenDuration);
    this.storeAuthData(userData.user_id, userData.username, userData.email, userData.token);
  }

  private storeAuthData(user_id: string, username: string, email: string, token: string ) {
    const data = JSON.stringify({user_id, username, email, token });
    console.log('data', data)
    localStorage.setItem('authData', data);
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }
}
