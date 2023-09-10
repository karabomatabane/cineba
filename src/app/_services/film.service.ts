import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  tmdbUrl = environment.tmdbUrl;
  
  getFilms(page: number) {
    //get films from api
    return this.http.get(this.baseUrl + 'film?page=' + page);
  }

  searchFilms(searchText: string) {
    //search films from tmdb api
    return this.http.get(this.tmdbUrl + '?query=' + searchText + '&include_adult=false&language=en-US&page=1');
  }

  addFilm(id: string, screeningDate: Date, screeningTime: Date) {
    //add film to collection
    //combine screeningDate and screeningTime
    screeningDate.setHours(screeningTime.getHours());
    return this.http.post(this.baseUrl + 'film/tmdb/' + id, {screeningDate: screeningDate});
  }

  vote(film: any) {
    return this.http.post(this.baseUrl + film.id + '/vote', {});
  }
}
