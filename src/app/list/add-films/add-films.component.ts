import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/_models/film.model';
import { FilmService } from 'src/app/_services/film.service';
import { ListService } from 'src/app/_services/list.service';
import { DialogListFormComponent } from '../new-view-list/dialog-list-form.component';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-add-films',
  templateUrl: './add-films.component.html',
  styleUrls: ['./add-films.component.css']
})
export class AddFilmsComponent implements OnInit {
  allFilms: Film[] = [] as Film[]; // all films in the database
  @Input() films: Film[] = [] as Film[]; // films that belong to the list
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 12;
  totalItems: number = 0;
  searchText: string = "";
  originalFilms: Film[] = [];

  constructor(
    private filmService: FilmService,
    private listService: ListService,
    public dialogRef: NbDialogRef<AddFilmsComponent>) { }

  ngOnInit(): void {
    this.getAllFilms();
  }

  getAllFilms() {
    this.filmService.getFilms(this.currentPage).subscribe((data: any) => {
      console.log(data)
      this.allFilms = data.results;
    });
  }

  loadMore() {
    this.currentPage++;
    this.filmService.getFilms(this.currentPage).subscribe((data: any) => {
      // append the new data to the existing list of films
      this.allFilms = this.allFilms.concat(data.results);
    });
  }

  isSelected(filmId: string): boolean {
    return this.films.some((f) => f._id === filmId);
  }

  onSubmit() {
    if (this.films.length === 0) {
      if(confirm("No existing films selected. Existing films will be removed from the list. Do you want to continue?")) {
        this.dialogRef.close(this.films);
      }
      return;
    }
    this.dialogRef.close(this.films); // Pass the vieList data to the parent component
  }

  onCancel() {
    this.dialogRef.close();
  }

  toggleSelection(film: Film, event: any) {
    if (event.target.checked) {
      this.films.push(film);
    } else {
      this.films = this.films.filter(f => f !== film);
    }
  }

  focusSearch() {
    // Scroll to the search bar
    document.getElementById('search-bar')?.scrollIntoView({ behavior: 'smooth' });
    // focus on the search bar input
    document.getElementById('search')?.focus();
  }

  search() {
    this.filmService.findFilm(this.searchText).subscribe(
      (data: any) => {
        this.allFilms = data.results;
        console.log(this.films);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
