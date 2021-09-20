import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../movies.service';

@Component({
  selector: 'app-movie-card-detail',
  templateUrl: './movie-card-detail.component.html',
  styleUrls: ['./movie-card-detail.component.scss']
})
export class MovieCardDetailComponent implements OnInit {

  starRating = 0
  displayrating;

  selected = 0;
  hovered = 0;


  @Input() movie;
  movieD;
  cardMovieDetail;
  rateHovered = 0;
 
  constructor( 
    private movieservice: MoviesService,
    private router: Router ,
    ) {
    
  }

  

  ngOnInit(): void {

    if (!this.movie) {
      this.router.navigate([''])
    } else {
      this.movieservice.getMovie(this.movie.id).subscribe(movieData => {
        console.log("movie details page 11233", movieData);
        this.movie = movieData
        this.displayrating = this.movie.avg_rating
        console.log("movie details page rate display", this.displayrating);
      })
      
    }

  }



  rateHover(rate) {
    this.rateHovered = rate;
  }

  rateClicked(){
    this.starRating = this.hovered
    console.log('this is results rte', this.starRating);
    this.movieservice.rateMovie(this.starRating, this.movie.id).then(
      result =>{
        this.movieservice.getMovie(this.movie.id).subscribe(movieData => {
          this.movie = movieData
          console.log('this is results rte dora 11', result);
          this.displayrating = this.movie.avg_rating
        })
      },
      error => console.log(error)
    );
    

  }


  getDetails(){
  }






}
