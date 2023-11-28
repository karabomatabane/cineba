import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, switchMap } from 'rxjs';
import { Film, FilmDetails, review } from '../_models/film.model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  tmdbUrl = environment.tmdbUrl;
  CURRENT_FILM = 'currentFilm';

  getFilms(page: number) {
    //get films from api
    return this.http.get(this.baseUrl + 'film?page=' + page);
  }

  getFilmDetails(id: string) : Observable<FilmDetails> {
    //get film details from api
    return this.http.get<FilmDetails>(this.baseUrl + 'film/' + id);
  }

  getAllFilms() : Observable<Film[]>{
    //get full list from api
    return this.http.get<Film[]>(this.baseUrl + 'film/admin/all');
  }

  setCurrentFilm(id: string) {
    //set current film in local storage
    localStorage.setItem(this.CURRENT_FILM, id);
  }

  getCurrentFilm() : string {
    //get current film from local storage
    return localStorage.getItem(this.CURRENT_FILM) || "";
  }

  updateFilm(film: any) {
    //update film http://localhost:3210/film/:id
    return this.http.put(this.baseUrl + 'film/' + film._id, film);
  }

  review(id: string, review: review) {
    return this.http.put(this.baseUrl + 'film/' + id + '/review', review);
  }

  searchFilms(searchText: string) {
    //search films from tmdb api
    return this.http.get(this.tmdbUrl + '?query=' + searchText + '&include_adult=false&language=en-US&page=1');
  }

  findFilm(searchText: string) {
    // find film from tmdb api
    const url = `${this.baseUrl}film?search=${searchText}`;
    return this.http.get(url);
  }


  addFilm(id: string, screeningDate: Date, screeningTime: Date) {
    //add film to collection
    //combine screeningDate and screeningTime
    screeningDate.setHours(screeningTime.getHours());
    return this.http.post(this.baseUrl + 'film/tmdb/' + id, {screeningDate: screeningDate});
  }

  addSAFilms(page: number): Observable<any> {
    const discoverUrl = 'https://api.themoviedb.org/3/discover/movie';
    return this.http.get(discoverUrl, {
      params: {
        include_adult: 'false',
        include_video: 'false',
        language: 'en-ZA',
        page: page.toString(),
        sort_by: 'popularity.desc',
        with_origin_country: 'ZA',
        with_original_language: 'en|ve|st|tn|ts|zu|xh|ss|nr|af'
      }
    }).pipe(
      switchMap((data: any) => {
        if (data && data.results && Array.isArray(data.results)) {
          const films = data.results;
          const ids = films.map((film: any) => film.id);
          console.log(ids);
          return this.http.post(this.baseUrl + 'film/seed', { ids });
        } else {
          // Handle unexpected response format
          console.error('Unexpected response format from TMDB API');
          return [];
        }
      })
    );
  }


  vote(id: string) {
    return this.http.put(`${this.baseUrl}film/${id}/vote`, {});
  }
}
