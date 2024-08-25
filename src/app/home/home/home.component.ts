import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilmService } from 'src/app/_services/film.service';
import { Film } from 'src/app/_models/film.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop: ElementRef | undefined;
  films: Film[] = [];
  searchText: string = "";
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 12;
  totalItems: number = 0;
  loading: boolean = false;
  lists: any;
  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.getFilms(this.currentPage);
    this.loading = true;
  }

  getFilms(page: number) {
    this.filmService.getFilms(page).subscribe((data: any) => {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      this.films = data.results;
      this.totalPages = data.total_pages;
      this.totalItems = data.total_results;
      // Scroll to the top of the page
      this.scrollToTop?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  searchFilm() {
    this.loading = true;
    this.filmService.findFilm(this.searchText).subscribe((data: any) => {
      this.films = data.results;
      this.totalPages = data.total_pages;
      this.totalItems = data.total_results;
      this.loading = false;
    }, (error: any) => {
      console.log(error);
      this.loading = false;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getFilms(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getFilms(this.currentPage);
    }
  }

}
