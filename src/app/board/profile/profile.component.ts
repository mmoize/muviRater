import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isCollapsed = true;

  userProfile;
  userAuthProfile;

  constructor(
    private movieService: MoviesService,
  ) {
    this.returnUserToken()
   }

  ngOnInit(): void {

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");

    this.movieService.getProfile().subscribe(resData => {
      console.log("retreived user profile", resData);
      this.userProfile = resData;
    });


  }



  async returnUserToken() {
    const value = await localStorage.getItem('authData') ;
    const dic = JSON.parse(value);
    this.userAuthProfile = dic
    console.log("retreived user profile",dic);
    return;
  }


  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }



}
