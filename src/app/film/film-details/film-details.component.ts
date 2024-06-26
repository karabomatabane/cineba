import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DialogReviewFormComponent } from 'src/app/_modals/dialog-review-form/dialog-review-form.component';
import { User } from 'src/app/_models/auth.model';
import { FilmDetails, review } from 'src/app/_models/film.model';
import { AuthService } from 'src/app/_services/auth.service';
import { FilmService } from 'src/app/_services/film.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  film: FilmDetails = {} as FilmDetails;
  rating: number = 0;
  currentUser: User = {} as User;
  isVoted: boolean = false;
  isDetailsLoaded: boolean = false;
  isAuthenticated: boolean = false;

  // reviews: review[] = [
  //   {
  //     user: { _id: "1", name: "User1" },
  //     comment: "A great movie!",
  //     rating: 4,
  //     date: new Date("2023-10-20"),
  //   },
  //   {
  //     user: { _id: "0", name: "User2" },
  //     comment: "I enjoyed it! It has become one of my favorite movies.",
  //     rating: 5,
  //     date: new Date("2023-10-20"),
  //   }
  // ];

  constructor(
    private filmService: FilmService,
    private dialogService: NbDialogService,
    private authService: AuthService,
    private toastr: NbToastrService) { }

  ngOnInit(): void {
    this.getFilmDetails();
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.getUserDetails();
      }
    });
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  getFullPosterUrl(posterPath: string): string {
    return posterPath?.length > 0 ? `https://image.tmdb.org/t/p/w500${posterPath}` : '../../assets/user.png';
  }

  getFilmDetails() {
    //get film id from route
    const id: string = window.location.pathname.split('/')[2];
    this.filmService.getFilmDetails(id).subscribe(
      (data: FilmDetails) => {
        this.isDetailsLoaded = true;
        console.log(data);
        this.film = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getReviewsList(): review[] {
    return this.film.filmDetail.reviews.filter(r => r.comment.length > 0);
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe(
      (user: User) => {
        this.currentUser = user;
        this.isVoted = this.currentUser.votedFilms.some(film => film._id === this.film._id);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getOverallRating(): number {
    let sum = 0;
    this.film.filmDetail.reviews.forEach(review => {
      sum += review.rating;
    });
    this.rating = sum / this.film.filmDetail.reviews.length;
    return Math.floor(this.rating) || 0;
  }

  getRatingCount(): number {
    return this.film.filmDetail.reviews.length;
  }

  submitReview(review: review) {
    review.date = new Date();
    review.user = { _id: this.authService.getUserId() || "Anonymous", username: this.currentUser.username || "Anonymous" };
    this.film.filmDetail.reviews.push(review);
    this.filmService.review(this.film._id, review).subscribe(
      (data) => {
        this.toastr.success("Review sent successfully", 'Success');
        this.getFilmDetails();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  submitVote() {
    if (!this.isAuthenticated) {
      this.toastr.warning("Please login to vote", 'Warning');
      return;
    }
    if (this.film._id === undefined) return;
    this.filmService.vote(this.film._id).subscribe(
      (data) => {
        console.log(data);
        this.isVoted = !this.isVoted;
        this.film.voteCount += this.isVoted ? 1 : -1;
        this.getUserDetails();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  openReviewModal() {
    if (!this.isAuthenticated) {
      this.toastr.warning("Please login to rate film", 'Warning');
      return;
    }
    this.dialogService.open(DialogReviewFormComponent)
      .onClose.subscribe(review => review && this.submitReview(review));
  }
}
