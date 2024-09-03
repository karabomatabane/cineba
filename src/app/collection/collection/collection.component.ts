import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Film } from 'src/app/_models/film.model';
import { AuthService } from 'src/app/_services/auth.service';
import { FilmService } from 'src/app/_services/film.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  //type should be Film[] or tmdbFilm[]
  @Input() films: any[] = [];
  @Input() buttonText: string = "";
  @Input() voteEnabled: boolean = false;
  screeningDate: Date = new Date();
  screeningTime: Date = new Date();
  votes: number = 1;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isRich: boolean = false;

  constructor(private filmService: FilmService,
    private toastr: NbToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.votes = this.authService.getVotes();
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.authService.isAdmin$.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
    this.isRich = (this.films.length > 0 && this.films[0].user !== undefined);
    console.log('isRich', this.isRich);
  }

  addFilm(id: string) {
    console.log('add film', id);
    this.filmService.addFilm(id, this.screeningDate, this.screeningTime).subscribe(
      () => {
        this.toastr.success('Film added to collection');
        this.films = this.films.filter(film => film.id !== id);
      },
      (error: { error: any; }) => {
        this.toastr.danger(error.error.error);
        console.log(error.error);
      }
    )
  }

  formatDuration(minutes: number): string {
    if (minutes === undefined) {
      return '0h 0m';
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  updateScreeningDate(filmId: string, selectedDate: Date) {
    this.films.find(film => film.id === filmId).screeningDate = selectedDate;
    this.screeningDate = selectedDate;
  }

  updateScreeningTime(filmId: string, selectedTime: Date) {
    this.films.find(film => film.id === filmId).screeningTime = selectedTime;
    this.screeningTime = selectedTime;
  }

  clickEvent(film: any, event: Event) {
    if (this.voteEnabled) {
      //cast film to Film
      film = film as Film;
      this.vote(film);
    } else {
      this.addFilm(film.id);
    }
  }

  getImagePath(path: string | null | undefined, posterPath: string | null | undefined): string {
    if (path && !path.includes('null')) {
      return `https://image.tmdb.org/t/p/w500/${path}`;
    } else if (posterPath && !posterPath.includes('null')) {
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    } else {
      return '../assets/placeholder.png';
    }
  }



  hide(film: any, event: Event) {
    if (event.target instanceof HTMLButtonElement) {
    film.active = false;
    this.filmService.updateFilm(film).subscribe(
      () => {
        this.films = this.films.filter(f => f._id !== film._id);
        this.toastr.success('Film hidden');
      }, (error: { error: any; }) => {
        this.toastr.danger(error.error.error);
        console.log(error.error);
      }
    )}
  }

  vote(film: Film) {
    if (this.isAuthenticated && this.votes > 0) {
      this.filmService.vote(film._id).subscribe(
        () => {
          this.toastr.success('Vote ok');
          console.log('vote ok');
        },
        (error) => {
          this.toastr.danger(error.error.status_message);
          console.log(error);
        }
      )
    } else {
      this.toastr.danger('You must be logged in to vote');
      //redirect to login
      this.router.navigate(['/login']);
    }
  }
}
