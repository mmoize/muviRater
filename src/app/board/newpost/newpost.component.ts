import { MoviesService } from './../movies.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {

  form;

  @Input() postMovie;

  selectedFile: ImageSnippet;

  constructor(
    private movieservice: MoviesService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });

  }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      // this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //   (res) => {

      //   },
      //   (err) => {

      //   })
    });

    reader.readAsDataURL(file);
  }


  onSubmit() {

     this.postMovie = false;

     const movieData = new FormData();
     movieData.append('title', this.form.value.title);
     movieData.append('description', this.form.value.description);
     movieData.append('image', this.selectedFile.file);

     this.movieservice.createPostListing(movieData).then(resData => {
       console.log('its been posted');
     });
  }



}
