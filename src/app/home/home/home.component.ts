import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilmService } from 'src/app/_services/film.service';
import { Film } from 'src/app/_models/film.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop: ElementRef | undefined;
  films: Film[] = [];
  searchText: string = "";
  loading: boolean = false;
  lists: any;
  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
  }
}
