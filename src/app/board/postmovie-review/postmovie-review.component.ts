
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import noUiSlider from "nouislider";
import { MoviesService } from '../movies.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-postmovie-review',
  templateUrl: './postmovie-review.component.html',
  styleUrls: ['./postmovie-review.component.scss']
})
export class PostmovieReviewComponent implements OnInit {

  form;
  imageAdded = false;
  imageAddBtn = false;
  element: HTMLElement;

  public loading = false;
  load;

  @Input() postMovie;

  selectedFile: ImageSnippet;



  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;

  constructor(
    private movieservice: MoviesService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'submit',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'submit',
        validators: [Validators.required]
      }),
    });



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


  registerTest() {
    // loading triggered
    this.load = true;

    setTimeout(() => {
        // loader stops after 5s
        this.load = false
        // ..
        //this.register = true;
    }, 5000)
}



  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

    });

    reader.readAsDataURL(file);

  }



  onSubmit() {

    this.showSpinner()
    console.log('its been posted', this.form.value);
    this.postMovie = false;

    const movieData = new FormData();
    movieData.append('title', this.form.value.title);
    movieData.append('description', this.form.value.description);
    movieData.append('image', this.selectedFile.file);

    this.movieservice.createPostListing(movieData).then(resData => {
      console.log('its been posted 1', resData);
    });
 }

 showSpinner() {
  this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
    this.router.navigate([''])
  }, 4000);
}


 addAnImage() {
  this.imageAdded = true;
  this.imageAddBtn = true;
 }


 @ViewChild('fileInput', { read: ElementRef }) fileInput: ElementRef;


 onGetFile() {
  this.fileInput.nativeElement.querySelector('imageInput').click()
  console.log("got the file")
 }



  
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

}
