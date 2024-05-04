import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Film } from 'src/app/_models/film.model';
import { FilmService } from 'src/app/_services/film.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop: ElementRef | undefined;
  films: Film[] = [];
  searchText: string = "";
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 12;
  totalItems: number = 0;
  loading: boolean = false;

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
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
