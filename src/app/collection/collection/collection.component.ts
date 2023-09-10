import { Component, Input, OnInit } from '@angular/core';
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

  votes: number = 0;
  constructor(private filmService: FilmService,
    private toastr: NbToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.votes = this.authService.getVotes();
  }
  
  addFilm(id: string) {
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

  updateScreeningDate(filmId: string, selectedDate: Date) {
    this.films.find(film => film.id === filmId).screeningDate = selectedDate;
    this.screeningDate = selectedDate;
  }

  updateScreeningTime(filmId: string, selectedTime: Date) {
    this.films.find(film => film.id === filmId).screeningTime = selectedTime;
    this.screeningTime = selectedTime;
  }

  clickEvent(film: any) {
    if (this.voteEnabled) {
      //cast film to Film
      film = film as Film;
      this.vote(film);
    } else {
      this.addFilm(film.id);
    }
  }

  vote(film: Film) {
    alert('vote');
    if (this.votes > 0) {
      this.filmService.vote(film).subscribe(
        () => {
          this.toastr.success('Vote ok');
          console.log('vote ok');
        },
        (error) => {
          this.toastr.danger(error.error.status_message);
          console.log(error);
        }
      )
    }
  }
}
