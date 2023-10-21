import { Component, OnInit } from '@angular/core';
import { FilmDetails } from 'src/app/_models/film.model';
import { FilmService } from 'src/app/_services/film.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  film : FilmDetails = {} as FilmDetails;
  rating : number = 0;

  reviews: any[] = [
    {
      user: "User1",
      comment: "A great movie!",
      rating: 4,
      date: new Date("2023-10-20"),
    },
    {
      user: "User2",
      comment: "I enjoyed it! It has become one of my favorite movies.",
      rating: 5,
      date: new Date("2023-10-20"),
    }
  ];

  constructor(private filmService : FilmService) { }

  ngOnInit(): void {
    this.getFilmDetails();
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
    const id : string = window.location.pathname.split('/')[2];
    this.filmService.getFilmDetails(id).subscribe(
      (data: FilmDetails) => {
        console.log(data);
        this.film = data;
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
    return Math.floor(this.rating) || 4;
  }
}