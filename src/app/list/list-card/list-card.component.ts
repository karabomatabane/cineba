import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { User } from 'src/app/_models/auth.model';
import { Film } from 'src/app/_models/film.model';
import { ViewList } from 'src/app/_models/list.model';
import { ListService } from 'src/app/_services/list.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
  @Input() viewList: ViewList = {} as ViewList;
  @Input() currentUser: User = {} as User;

  constructor(private toastr: NbToastrService, private viewListService: ListService) { }

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

  addLike() {
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
}
