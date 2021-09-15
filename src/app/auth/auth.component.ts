import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isCollapsed = true;
  focus;
  focus1;
  focus2;



  form;
  defaultValue;
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
        updateOn: 'change',
        validators: [Validators.required]
      }),
      username: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: []
      }),
      token: new FormControl(null, {
        updateOn: 'change',
        validators: []
      }),
    });

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);


  }


  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
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


  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }



}
