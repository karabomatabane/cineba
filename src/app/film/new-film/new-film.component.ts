import { Component, OnInit } from '@angular/core';
import { Film, tmdbFilm } from 'src/app/_models/film.model';
import { FilmService } from 'src/app/_services/film.service';

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrls: ['./new-film.component.css']
})
export class NewFilmComponent implements OnInit {
  films: tmdbFilm[] = [];
  searchText: string ="";
  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
  }

  searchFilms() {
    this.filmService.searchFilms(this.searchText).subscribe(
      (data: any) => {
        this.films = data.results;
        console.log(this.films);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
