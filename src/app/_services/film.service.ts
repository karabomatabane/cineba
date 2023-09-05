import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://api.themoviedb.org/3/movie/';
  
  getMovies(page: number) {
    //get movies from api
    return this.http.get(this.baseUrl + 'popular?language=en-US&page=' + page);
  }
}
