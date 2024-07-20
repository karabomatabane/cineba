import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Film } from 'src/app/_models/film.model';
import { ViewList } from 'src/app/_models/list.model';
import { FilmService } from 'src/app/_services/film.service';
import { ListService } from 'src/app/_services/list.service';
import { AddFilmsComponent } from '../add-films/add-films.component';

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
  fakeFilm: Film = {
    "_id": "656592d30ba044f0a78154ec",
    "name": "!Aitsa",
    "imgUrl": "https://image.tmdb.org/t/p/w500/9HKfpQMmRKHEQpj7JddeUgnznaX.jpg",
    "voteCount": 0,
    "releaseDate": new Date("2023-03-16T00:00:00.000Z"),
    "screeningDate": new Date("2024-01-01T00:00:00.000Z"),
    "duration": 89,
    "language": "English",
    "filmDetail": "656592d30ba044f0a78154e9",
    "active": true,
  };

  constructor(
    private viewListService: ListService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) { }

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
      // if (!this.isAuthenticated) {
      //   this.toastr.warning("Please login to create view list", 'Warning');
      //   return;
      // }
      this.films.push(this.fakeFilm);
      this.dialogService.open(AddFilmsComponent, {context: {films: this.films}})
        .onClose.subscribe(films => films && this.submitListFilms(films));
  }

  submitListFilms(films: Film[]) {
    this.viewList.films = films;
    this.viewListService.updateViewList(this.viewList._id, this.viewList).subscribe((res) => {
      console.log(res);
    }, (error) => {
      console.error(error)
    })
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
