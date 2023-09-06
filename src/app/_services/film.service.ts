import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://api.themoviedb.org/3/movie/';
  
  getFilms(page: number) {
    //get movies from api
    return this.http.get(this.baseUrl + 'popular?language=en-US&page=' + page);
  }

  vote(film: any) {
    return this.http.post(this.baseUrl + film.id + '/rating?api_key=1f54bd990f1cdfb230adb312546d765d', { value: film.vote_average });
  }
}
