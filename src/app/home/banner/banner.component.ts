import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() films: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  getFilms() {
    // top three films
    return this.films.slice(0, 3);
  }

  getFeaturedContentStyle(): any {
    const imgUrl = this.getImagePath(this.films[3].imgUrl, this.films[3].poster_path);
    return {
      'background': `linear-gradient(to bottom, rgba(0,0,0,0), #151515), url(${imgUrl})`
    };
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  getYear(date: string): string {
    return date.split('-')[0];
  }

  getImagePath(path: string | null | undefined, posterPath: string | null | undefined): string {
    if (path && !path.includes('null')) {
      return `https://image.tmdb.org/t/p/w500/${path}`;
    } else if (posterPath && !posterPath.includes('null')) {
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    } else {
      return '../assets/film.png';
    }
  }
}
