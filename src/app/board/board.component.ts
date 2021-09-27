import { MoviesService } from './movies.service';
import { AuthService } from './../auth/auth.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { Movie } from '../models/Movie';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  query: string;
  movies$: Observable<Array<Movie>>;
  newlySearchedMovies;
  newSearchedMovies = false;
  

  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;



  movieList;
  movieDetail;

  addingMovie= false;
  postMovie = false;
  postDetail= false;

  constructor(
    private authservice: AuthService,
    private movieService: MoviesService,
    private router: Router ,
    private spinner: NgxSpinnerService,
  ) {}

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  @ViewChild('load_target') div; 
  

  ngOnInit(): void {
    console.log("check for newly search movies", this.newlySearchedMovies)
    
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    this.onloadMovies();
  }

  ngAfterViewInit(){
    this.scroll(this.div)
  }





  scroll(el: HTMLElement) {
    el.scrollIntoView();
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
    console.log('board page movie data', data)
    this.router.navigate(['/movie-detail'], {queryParams: data})

  }



  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate([''])
    }, 4000);
  }



  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }


  searchedMovies(value) {
    this.newSearchedMovies =
    this.newlySearchedMovies = value
    console.log("its the searched results", this.newlySearchedMovies)
    if (this.newlySearchedMovies == undefined) {
      console.log("its the searched results true or false", this.newSearchedMovies)
      this.newSearchedMovies = false;
    }else {
      this.newSearchedMovies =true
    }
  }


  returnTOMovieExple() {
    this.newSearchedMovies = false
  }


  searchedMovieDetail(movie) {
    console.log("imbid 1", movie.imdbID)
    this.router.navigate(['/movie-detail'], {queryParams: movie})
  }



}
