import { MoviesService } from './../movies.service';
import { Component, Input, OnInit } from '@angular/core';
import noUiSlider from "nouislider";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieDetail } from 'src/app/models/Movie';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  starRating = 0;

 searchedMovie:  Observable<MovieDetail>;
 movieSearched = false;

  isCollapsed = true;
  focus;
  focus1;
  focus2;

  @Input() movieDetail;
  cardMovieDetail;
  rateHovered = 0;
  date = new Date();
  pagination = 3;
  pagination1 = 1;

  constructor(
    private movieservice: MoviesService,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe(params => {
      console.log('imbid', params.imdbID)
      if (params.imdbID != undefined) {
        this.movieSearched = true;
        console.log('imbid n', params.imdbID)
        this.movieservice.getMovieDetails(params.imdbID).subscribe(resData => {
          console.log("search in progress insde request detail", resData);
          this.searchedMovie = resData;
        });

      } else {

        this.movieSearched = false;

        this.movieDetail = params

        this.movieservice.getMovie(this.movieDetail.id).subscribe(movieData => {
          this.cardMovieDetail = movieData
        })
      }

    })
  }

  ngOnInit(): void {

    this.cardMovieDetail = this.movieDetail


    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    var slider = document.getElementById("sliderRegular");

    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById("sliderDouble");

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });

  }


  ngDoCheck() {
    this.cardMovieDetail = this.movieDetail
  }



  rateHover(rate) {
    this.rateHovered = rate;
  }

  rateClicked(rate: number){
    this.movieservice.rateMovie(rate, this.movieDetail.id).then(
      result =>{
        console.log('this is results', result);
        this.getDetails();
        if (this.movieDetail.avg_rating === 0 ) {
          this.movieDetail.avg_rating = rate;
        }
      },
      error => console.log(error)
    );
  }

  getDetails(){
    // this.apiService.getMovie(this.movie.id).subscribe(
    //   (movie: Movie) => {
    //     this.updateMovie.emit(movie);
    //   },
    //   error => console.log(error)
    // );
  }

}
