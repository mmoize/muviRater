import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from 'rxjs';
import { map, timeout,  } from 'rxjs/operators';
import { Movie, MovieDetail, MovieSearch } from '../models/Movie';
//import { Observable } from 'rxjs/observable';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl = 'https://film-raters.herokuapp.com/';
  baseMovieUrl = `${this.baseUrl}api/movie/movies/`;
  baseMovieCreateUrl =  `${this.baseUrl}api/newmovie`;
  headers;
  token;
  currentUsername;
  private readonly API_KEY = `d70f7608`;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.returnUserToken();

  }
  async returnUserToken() {
    const value = await localStorage.getItem('authData') ;
    const dic = JSON.parse(value);
    const dicToken = dic.token;
    this.currentUsername = dic.username
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


  getProfile() {
    this. headers= new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`
    });
    return this.httpClient.get<Movie[]>(`${this.baseUrl}account/profile/${this.currentUsername}/ `, {headers: this.headers});
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


  searchMovie(searchQuery: string): Observable<Array<MovieSearch>> {
    console.log('searching movie service in progress')
    return this.httpClient.get(`https://omdbapi.com/?apikey=${this.API_KEY}&s=${searchQuery}`)
      .pipe(
        map((response: any) => response.Search)
      );
  }


  getsearchMovie(searchQuery: string): Observable<Array<MovieSearch>>  {
    return this.httpClient.get(`https://omdbapi.com/?apikey=${this.API_KEY}&s=${searchQuery}`).pipe((
      map((response: any) => response.Search)
    ));
  
  }


  getMovieDetails(imdbId: string): Observable<any> {
    return this.httpClient.get(`https://www.omdbapi.com/?apikey=${this.API_KEY}&i=${imdbId}&plot=full`);
  }




}

