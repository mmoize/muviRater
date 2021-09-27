import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from "jquery"
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Movie, MovieSearch } from 'src/app/models/Movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  query: string;
  public movies$: Observable<Array<MovieSearch>>;


  currentlySearching = false;

  @Output() searchedItems = new EventEmitter<any>();

  constructor(
    private movieService: MoviesService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit(): void {

    $(document).ready(function(){
      $("#search").focus(function() {
        $(".search-box").addClass("border-searching");
        $(".search-icon").addClass("si-rotate");
      });
      $("#search").blur(function() {
        $(".search-box").removeClass("border-searching");
        $(".search-icon").removeClass("si-rotate");
      });
      $("#search").keyup(function() {
          if($(this).val().length > 0) {
            $(".go-icon").addClass("go-in");
          }
          else {
            $(".go-icon").removeClass("go-in");
          }
      });
      $(".go-icon").click(function(){
        $(".search-form").submit();
      });
  });
  }


  getSearchResults() {
    this.showSpinner()
    console.log("search in progress", this.query);

    this.movieService.getsearchMovie(this.query).subscribe(resData => {
      console.log("search in progress insde request", resData);
      this.newlySearchedItems(resData);
    });

    this.movies$ = this.movieService.getsearchMovie(this.query);

    console.log("search in progress 2", this.movies$);
    this.newlySearchedItems(this.movies$);
  }


  newlySearchedItems(value) {
    console.log('its been passed', value)
    this.searchedItems.emit(value);
    this.spinner.hide();
  }


  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }



  searchInProgress() {
    this.currentlySearching = true;
  }

  searchNotInProgress() {
    this.currentlySearching = false;
  }



}
