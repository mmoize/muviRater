import { MoviesService } from './movies.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  postMovie = false;
  constructor(
    private authservice: AuthService,
    private movieService: MoviesService,
    private router: Router ,
  ) { }

  ngOnInit(): void {

  }


  onLogOut() {
    this.authservice.logout();
    this.router.navigateByUrl('auth');

  }

  onloadMovies() {
    this.movieService.getMovies().subscribe(res => {
      console.log('this is movies', res);
    });
  }

  onPost() {
    this.postMovie = true;
    if (!!this.postMovie) {
      console.log('this is movies 1', this.postMovie);
      this.postMovie = true;
    } else  {
      console.log('this is movies ', this.postMovie);
      this.postMovie = false;
    }
  }

}
