import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl = 'https://film-raters.herokuapp.com/';
  baseMovieUrl = `${this.baseUrl}api/movie/movies/`;
  baseMovieCreateUrl =  `${this.baseUrl}api/newmovie`;
  headers;
  token;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.returnUserToken();

  }
  async returnUserToken() {
    const value = await localStorage.getItem('authData') ;
    const dic = JSON.parse(value);
    const dicToken = dic.token;
    this.token = dicToken;
    console.log('for auth token', dicToken);

    return dicToken;
  }

  async createPostListing(data) {
    const value = await localStorage.getItem('authData') ;
    const dic = JSON.parse(value);
    const dicToken = dic.token;
    this.token = dicToken;
    console.log('for auth token', dicToken);


    const xhr = new XMLHttpRequest();
    const url = this.baseMovieCreateUrl;
    xhr.open('POST', url, true);
    xhr.setRequestHeader( 'Authorization', 'Token ' + dicToken );
    xhr.withCredentials = true;
    return xhr.send(data);
  }

  async rateMovie(rate: number, movieId: number) {
    const value = await localStorage.getItem('authData') ;
    const dic = JSON.parse(value);
    const dicToken = dic.token;
    this.token = dicToken;
    const body = JSON.stringify({stars: rate});


    const xhr = new XMLHttpRequest();
    const url = `${this.baseMovieUrl}${movieId}/rate_movie/`
    xhr.open('POST', url, true);
    xhr.setRequestHeader( 'Authorization', 'Token ' + dicToken );
    xhr.setRequestHeader( 'Content-Type', 'application/json');
    xhr.withCredentials = true;
    return xhr.send(body);
  }


  getMovies() {
    this. headers= new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    console.log('this is ', this.headers);
    return this.httpClient.get<Movie[]>(this.baseMovieUrl, {headers: this.headers});
  }

  raeMovie(rate: number, movieId: number) {
    const body = JSON.stringify({stars: rate});
    return this.httpClient.post(`${this.baseMovieUrl}${movieId}/rate_movie/`, body, {headers: this.headers});
  }

  getMovie(id: number) {
    return this.httpClient.get(`${this.baseMovieUrl}${id}/`, {headers: this.headers});
  }

  createMovie(title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.post(`${this.baseMovieUrl}`, body, {headers: this.headers});
  }

  updateMovie(id: number, title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.put(`${this.baseMovieUrl}${id}/`, body, {headers: this.headers});
  }

  deleteMovie(id: number) {
    return this.httpClient.delete(`${this.baseMovieUrl}${id}/`,  {headers: this.headers});
  }

  loginUser(authData){

    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers: this.headers});

  }

  registerUser(authData){
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, {headers: this.headers});
  }

  // getAuthHeaders() {
  //   const token = this.cookieService.get('mr-token');
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Token ${token}`
  //   });
  // }






}

