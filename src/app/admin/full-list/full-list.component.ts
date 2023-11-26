import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Film } from 'src/app/_models/film.model';
import { FilmService } from 'src/app/_services/film.service';

@Component({
  selector: 'app-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.css']
})
export class FullListComponent implements OnInit {
  films: Film[] = [];
  originalFilms: Film[] = [];
  searchText: string = "";

  constructor(
    private toastr: NbToastrService,
    private filmService: FilmService,
  ) { }

  ngOnInit(): void {
    this.getFullList();
  }

  getFullList() {
    this.filmService.getAllFilms().subscribe((res: Film[]) => {
      this.films = res;
      this.originalFilms = res;
      if (this.searchText !== "") {
        this.search();
      }
      this.toastr.success("Full list retrieved successfully", 'Success');
    }, (error: any) => {
      console.log(error);
      this.toastr.danger(error.error, 'Error');
    });
  }

  search() {
    if (this.searchText === "") {
      this.films = this.originalFilms;
    } else {
      if (this.searchText.includes(":h") || this.searchText.includes(":v")) {
        //:h for hidden and :v for visible
        const visible = this.searchText.includes(":v");
        const hidden = this.searchText.includes(":h");
        const searchText = this.searchText.replace(":h", "").replace(":v", "").trim();
        // if hidden and visible are both true or not provided, search all films
        if (hidden === visible) {
          this.films = this.originalFilms.filter(film => film.name.toLowerCase().includes(searchText.toLowerCase()));
        } else {
          this.films = this.originalFilms.filter(film => film.name.toLowerCase().includes(searchText.toLowerCase()) && film.active === visible);
        }
      } else {
        this.films = this.originalFilms.filter(film => film.name.toLowerCase().includes(this.searchText.toLowerCase()));
      }
    }
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  toggleVisibility(id: string) {
    let film = this.films.find(film => film._id === id) as Film;
    film.active = !film?.active;
    this.filmService.updateFilm(film).subscribe((res) => {
      this.toastr.success("Film updated successfully", 'Success');
      this.getFullList();
    }, (error: any) => {
      console.log(error);
      this.toastr.danger(error.error, 'Error');
    });
  }
}
