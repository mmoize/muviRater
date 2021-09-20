import { MoviesService } from './movies.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { SearchbarComponent } from './searchbar/searchbar.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
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
  ) {}

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  @ViewChild('load_target') div; 
  

  ngOnInit(): void {
    
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



  name = 'Angular';




  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }


}
