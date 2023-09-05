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
  movies: Film[] = [];
  searchText: string | undefined;
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 20;
  totalItems: number = 0;
  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.getMovies(this.currentPage);
  }

  getMovies(page: number) {
    this.filmService.getMovies(page).subscribe((data: any) => {
      this.movies = data.results;
      this.totalPages = data.total_pages;
      this.totalItems = data.total_results;
      // Scroll to the top of the page
      this.scrollToTop?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getMovies(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMovies(this.currentPage);
    }
  }

}
