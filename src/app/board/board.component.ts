import { MoviesService } from './movies.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  movieList;
  movieDetail;

  addingMovie= false;
  postMovie = false;
  postDetail= false;

  constructor(
    private authservice: AuthService,
    private movieService: MoviesService,
    private router: Router ,
  ) {

  }

  ngOnInit(): void {
    this.onloadMovies();
  }


  onLogOut() {
    this.authservice.logout();
    this.router.navigateByUrl('auth');

  }

  onloadMovies() {
    this.movieService.getMovies().subscribe(res => {
      this.movieList = res;

    });
  }

  onPost() {

    if (this.postMovie === false) {
      console.log('this is movies 1', this.postMovie);
      this.postMovie = true;
      this.addingMovie = true;
    } else  {
      console.log('this is movies ', this.postMovie);
      this.postMovie = false;
    }


  }

  onBackHome() {
    if (this.addingMovie === true) {
      console.log('this is movies 1', this.addingMovie);
      this.addingMovie = false;
      this.postMovie = false;
      this.postDetail = false;
      this.addingMovie = false;
      this.onloadMovies();
    }
  }

  onMovieDetail(data) {
    this.movieDetail = data;
    this.postDetail = true;
    this.addingMovie = true;

  }

}
