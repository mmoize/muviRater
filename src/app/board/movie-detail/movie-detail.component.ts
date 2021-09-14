import { MoviesService } from './../movies.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  @Input() movieDetail;
  rateHovered = 0;


  constructor(
    private movieservice: MoviesService
  ) { }

  ngOnInit(): void {
    console.log('this ', this.movieDetail);
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
