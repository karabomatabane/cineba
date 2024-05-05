import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/auth.model';
import { Film } from 'src/app/_models/film.model';
import { ViewList } from 'src/app/_models/list.model';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
  @Input() viewList: ViewList = {} as ViewList;
  @Input() currentUser: User = {} as User;

  constructor() { }

  ngOnInit(): void {
    console.log(this.currentUser, this.viewList.owner);
  }

  getImagePath(film: Film) {
    if (film.imgUrl && !film.imgUrl.includes('null')) {
      return `https://image.tmdb.org/t/p/w500${film.imgUrl}`;
    }
    return '../assets/placeholder.png';
  }

  getInitials(name: string) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  }
}
