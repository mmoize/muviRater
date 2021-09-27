import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  @Input() movie;
  @Input() searchedMovie;

  constructor() { }

  ngOnInit(): void {
    console.log("from searched activity")
  }

  transform = [{ height: "100", width: "100" }];

}
