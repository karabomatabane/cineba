import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Film } from 'src/app/_models/film.model';
import { Comment, ViewList } from 'src/app/_models/list.model';
import { FilmService } from 'src/app/_services/film.service';
import { ListService } from 'src/app/_services/list.service';
import { AddFilmsComponent } from '../add-films/add-films.component';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/auth.model';
import { DialogCommentComponent } from '../dialog-comment/dialog-comment.component';
import { DialogShareComponent } from '../dialog-share/dialog-share.component';

@Component({
  selector: 'app-view-list-detail',
  templateUrl: './view-list-detail.component.html',
  styleUrls: ['./view-list-detail.component.css']
})
export class ViewListDetailComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop: ElementRef | undefined;
  currentUser: User = {} as User;
  films: Film[] = [];
  searchText: string = "";
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 12;
  totalItems: number = 0;
  loading: boolean = false;
  viewList = {} as ViewList;
  isAuthenticated: boolean = false;
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
    private dialogService: NbDialogService,
    private toastr: NbToastrService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getViewListDetails(params['id']);
    });
    this.getUserDetails();
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
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
      if (data.private && data.owner._id !== this.currentUser._id) {
        this.toastr.warning('This view list is private', 'Warning');
        this.loading = false;
        this.router.navigate(['/']);
        return;
      };
      this.films = data.films;
      this.viewList = data;
      this.totalItems = data.films.length;
      this.loading = false;
    });
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe(
      (user: User) => {
        this.currentUser = user;
      },
      (error) => {
        console.log(error);
      }
    )
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
    if (Object.keys(this.currentUser).length === 0) {
      this.toastr.danger('You must be logged in to like a list', 'Error');
      return;
    }
    let msg = '';
    if (this.viewList.likes.includes(this.currentUser._id)) {
      this.viewList.likes = this.viewList.likes.filter((id) => id !== this.currentUser._id);
      msg = 'List unliked successfully';
    } else {
      this.viewList.likes.push(this.currentUser._id);
      msg = 'List liked successfully';
    }
    this.viewListService.updateViewList(this.viewList._id, { likes: this.viewList.likes }).subscribe((res) => {
      this.toastr.success(msg, 'Success');
      console.log(res);
    }, (err) => {
      this.toastr.danger('An error occurred while liking the list', 'Error');
    });
  }

  submitComment(message: any) {
    const comment: Comment = {
      user: { _id: this.currentUser._id, username: this.currentUser.username },
      message: message,
      date: new Date(),
    };
    this.viewList.comments.push(comment);
    this.viewListService.updateViewList(this.viewList._id, this.viewList).subscribe((res) => {
      this.toastr.success('Comment added successfully', 'Success');
      console.log(res);
    }, (error) => {
      this.toastr.danger('An error occurred while adding comment', 'Error');
      console.error(error);
    });
  }

  commentViewList() {
    if (!this.isAuthenticated) {
      this.toastr.warning('Please login to comment on view list', 'Warning');
      return;
    }
    this.dialogService.open(DialogCommentComponent)
      .onClose.subscribe(data => data && this.submitComment(data.comment));
  }

  shareViewList() {
    this.dialogService.open(DialogShareComponent, { context: { title: this.viewList.name } });
  }

  addFilmToList() {
      if (!this.isAuthenticated) {
        this.toastr.warning("Please login to modify view list", 'Warning');
        return;
      }

      this.dialogService.open(AddFilmsComponent, {context: {films: this.films}})
        .onClose.subscribe(films => films && this.submitListFilms(films));
  }

  submitListFilms(films: Film[]) {
    this.viewList.films = films;
    this.viewListService.updateViewList(this.viewList._id, this.viewList).subscribe((res) => {
      this.toastr.success('List updated successfully', 'Success');
      // refresh the view list
      this.getViewListDetails(this.viewList._id);
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
