import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/_models/film.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  @Input() movies: Film[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
