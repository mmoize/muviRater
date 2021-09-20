import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  constructor() { }

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

}
