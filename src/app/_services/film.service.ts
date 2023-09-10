import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  
  getFilms(page: number) {
    //get movies from api
    return this.http.get(this.baseUrl + 'film?page=' + page);
  }

  vote(film: any) {
    return this.http.post(this.baseUrl + film.id + '/vote', {});
  }
}
