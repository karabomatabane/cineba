import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/_models/film.model';
import { ViewList } from 'src/app/_models/list.model';
import { FilmService } from 'src/app/_services/film.service';
import { ListService } from 'src/app/_services/list.service';

@Component({
  selector: 'app-view-list-detail',
  templateUrl: './view-list-detail.component.html',
  styleUrls: ['./view-list-detail.component.css']
})
export class ViewListDetailComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop: ElementRef | undefined;
  films: Film[] = [];
  searchText: string = "";
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 12;
  totalItems: number = 0;
  loading: boolean = false;
  viewList = {} as ViewList;

  constructor(private viewListService: ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getViewListDetails(params['id']);
    });
  }

  // getFilms(page: number) {
  //   this.filmService.getFilms(page).subscribe((data: any) => {
  //     setTimeout(() => {
  //       this.loading = false;
  //     }, 2000);
  //     this.films = data.results;
  //     this.totalPages = data.total_pages;
  //     this.totalItems = data.total_results;
  //     // Scroll to the top of the page
  //     this.scrollToTop?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  //   });
  // }

  getViewListDetails(viewListId: string) {
    this.loading = true;
    this.viewListService.getViewList(viewListId).subscribe((data: any) => {
      this.films = data.films;
      this.viewList = data;
      this.totalItems = data.films.length;
      this.loading = false;
    });
  }

  searchFilm() {
    this.loading = true;
    // this.filmService.findFilm(this.searchText).subscribe((data: any) => {
    //   this.films = data.results;
    //   this.totalPages = data.total_pages;
    //   this.totalItems = data.total_results;
    //   this.loading = false;
    // }, (error: any) => {
    //   console.log(error);
    //   this.loading = false;
    // });
  }

  likeViewList() {
    console.log('Like view list');
  }

  commentViewList() {
    console.log('Comment view list');
  }

  shareViewList() {
    console.log('Share view list');
  }

  addFilmToList() {
    console.log('Add film to list');
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // this.getFilms(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      // this.getFilms(this.currentPage);
    }
  }

}
