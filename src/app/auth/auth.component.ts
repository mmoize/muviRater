import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form;
  isLogin = true;
  isPassReset = false;
  ispassTokenInput = false;

  isLoading = false;

  constructor(private authService: AuthService,
              private router: Router ,

             ) { }

  ngOnInit() {

    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      username: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: []
      }),
      token: new FormControl(null, {
        updateOn: 'blur',
        validators: []
      }),
    });
  }


 authenticate(email: string, password: string, username: string) {
      console.log('info authen', username, 'and', password);


      let authObs: Observable<AuthResponseData>;
      if (this.isLogin) {
        authObs = this.authService.login(username, password);
      } else {
        authObs = this.authService.signup(email, password, username);
      }

      authObs.subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigateByUrl('');
      });


  }

  // onPasswordReset() {

  //   const data = new FormData();
  //   data.append('email', this.form.value.email);
  //   console.log('this is reset email', this.form.value.email);

  //   this.authService.onRequestPasswordReset(data);

  //   setTimeout(() => {
  //     this.ispassTokenInput = true;
  //   }, 1000);

  // }

  // passwordOnTokenReset() {
  //   const data = new FormData();
  //   data.append('token', this.form.value.token);
  //   data.append('password', this.form.value.password);


  //   this.authService.onRequestNewPasswordReset(data);

  //   setTimeout(() => {
  //     this.isPassReset= false;
  //   }, 1000);

  // }


  onSubmit() {
    if (!this.form.value.password) {
      return;
    }
    const email =  this.form.value.email;
    const password =  this.form.value.password;
    const username =  this.form.value.username;

    this.authenticate(email,  password, username);

  }

  onSwitchAuthMode() {
    if (this.isLogin) {
      this.isLogin = false;
    } else if (!this.isLogin) {
      this.isLogin = true;
    }
  }

  // private showAlert(message: string) {
  //   this.alertCtrl.create({
  //     header: 'Authentication failed',
  //     // tslint:disable-next-line: object-literal-shorthand
  //     message: message,
  //     buttons: ['okay']
  //   }).then(alertEl => {
  //     alertEl.present();
  //   });
  // }

  // onPassReset() {
  //   this.isPassReset = true;
  // }


  // onCanclePassReset() {
  //   this.isPassReset = false;
  // }

}
