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
  @Input() films: Film[] = [];
  votes: number = 0;
  constructor(private filmService: FilmService,
    private toastr: NbToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.votes = this.authService.getVotes();
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
