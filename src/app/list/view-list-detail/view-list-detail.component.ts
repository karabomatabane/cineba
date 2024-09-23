import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Film } from 'src/app/_models/film.model';
import { Comment, ListFilm, Member, ViewList } from 'src/app/_models/list.model';
import { FilmService } from 'src/app/_services/film.service';
import { ListService } from 'src/app/_services/list.service';
import { AddFilmsComponent } from '../add-films/add-films.component';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/auth.model';
import { DialogCommentComponent } from '../dialog-comment/dialog-comment.component';
import { DialogShareComponent } from '../dialog-share/dialog-share.component';
import { ManageMembersComponent } from 'src/app/view-list/manage-members/manage-members.component';

@Component({
  selector: 'app-view-list-detail',
  templateUrl: './view-list-detail.component.html',
  styleUrls: ['./view-list-detail.component.css']
})
export class ViewListDetailComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop: ElementRef | undefined;
  currentUser: User = {} as User;
  richFilms: ListFilm[] = [];
  films: Film[] = [];
  searchText: string = "";
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 12;
  totalItems: number = 0;
  loading: boolean = false;
  viewList = {} as ViewList;
  isAuthenticated: boolean = false;
  alertIsOpen = true;
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
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      this.getUserDetails();
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
      }
      this.richFilms = data.films;
      this.films = data.films.map((listFilm: ListFilm) => listFilm.film);
      this.viewList = data;
      this.totalItems = data.films.length;
      this.loading = false;
    });
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe(
      (user: User) => {
        this.currentUser = user;
        this.route.params.subscribe((params) => {
          this.getViewListDetails(params['id']);
        });
      },
      (error) => {
        console.log(error);
        this.route.params.subscribe((params) => {
          this.getViewListDetails(params['id']);
        });
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

    if (!this.isMember(this.currentUser._id) || this.isPending(this.currentUser._id)) {
      this.toastr.warning("You must join the view list to add films", 'Warning');
      return;
    }

    this.dialogService.open(AddFilmsComponent, { context: { films: this.films } })
      .onClose.subscribe(films => films && this.submitListFilms(films));
  }

  toggleMembership() {
    console.log("toggle membership");
    if (!this.isAuthenticated) {
      this.toastr.warning('Please login to join view list', 'Warning');
      return;
    }
    if (this.isMember(this.currentUser._id)) {
      this.viewList.members = this.viewList.members.filter((member) => member.user.id !== this.currentUser._id);
      this.viewListService.exitViewList(this.viewList._id).subscribe((res) => {
        this.toastr.success('You have exited the view list', 'Success');
        console.log(res);
      }, (error) => {
        this.toastr.danger('An error occurred while exiting the view list', 'Error');
        console.error(error);
      });
    } else {
      this.viewList.members.push({ user: { id: this.currentUser._id, username: this.currentUser.username }, status: 'pending' });
      this.viewListService.joinViewList(this.viewList._id, this.currentUser.username).subscribe((res) => {
        this.toastr.success('You have joined the view list', 'Success');
        console.log(res);
      }, (error) => {
        this.toastr.danger('An error occurred while joining the view list', 'Error');
        console.error(error);
      });
    }
  }

  manageMembers() {
    this.dialogService.open(ManageMembersComponent, { context: { members: this.viewList.members } })
    .onClose.subscribe(members => members && this.submitMembers(members));
  }

  isMember(id: string) {
    if (id === "" || id === undefined) {
      return false;
    }
    return this.viewList.members.filter(member => member.user.id === id).length > 0;
  }

  isPending(id: string) {
    if (id === "" || id === undefined) {
      return false;
    }
    return this.viewList.members.filter(member => member.user.id === id && member.status === 'pending').length > 0;
  }

  isRejected(id: string) {
    if (id === "" || id === undefined) {
      return false;
    }
    return this.viewList.members.filter(member => member.user.id === id && member.status === 'rejected').length > 0;
  }

  hasPending() {
    return this.viewList.members.filter(member => member.status === 'pending').length > 0;
  }

  isOwner() {
    return this.currentUser._id === this.viewList.owner._id;
  }

  submitListFilms(films: Film[]) {
    const updatedFilmIds = new Set(films.map(film => film._id));

    // Identify deleted films
    const deletedFilms = this.richFilms.filter(richFilm =>
      !updatedFilmIds.has(richFilm.film._id));

    // Remove the deleted films from richFilms
    if (this.currentUser._id === this.viewList.owner._id) {
      this.richFilms = this.richFilms.filter(film => !deletedFilms.includes(film));
    }
    
    // Identify new films
    const newFilms = films
      .filter(film => !this.richFilms.some(existingFilm => existingFilm.film._id === film._id))
      .map(film => ({
        film: film,
        user: { _id: this.currentUser._id, username: this.currentUser.username }
      }));

    // Add new films to the richFilms array
    this.richFilms.push(...newFilms);

    // Update the view list with the modified films
    this.viewList.films = this.richFilms;
    this.viewListService.updateViewList(this.viewList._id, this.viewList).subscribe((res) => {
      this.toastr.success('List updated successfully', 'Success');
      // refresh the view list
      this.getViewListDetails(this.viewList._id);
    }, (error) => {
      console.error(error)
    })
  }

  submitMembers(members: Member[]) {
    this.viewList.members = members;
    this.viewListService.updateViewList(this.viewList._id, this.viewList).subscribe((res) => {
      this.toastr.success('Members updated successfully', 'Success');
      console.log(res);
    }, (error) => {
      this.toastr.danger('An error occurred while updating members', 'Error');
      console.error(error);
    });
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

  onClose() {
    // close alert
    this.alertIsOpen = false;
  }
}
