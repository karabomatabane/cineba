import {Component, Input, OnInit} from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { User } from 'src/app/_models/auth.model';
import { AuthService } from 'src/app/_services/auth.service';
import { ListService } from 'src/app/_services/list.service';
import { DialogEnlistComponent } from 'src/app/list/dialog-enlist/dialog-enlist.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() films: any[] = [];
  currentUser: User = {} as User;

  constructor(
    private dialogService: NbDialogService,
    private authService: AuthService,
    private viewListService: ListService,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getFilms() {
    // top three films
    return this.films.slice(0, 3);
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe(
      (user: User) => {
        this.currentUser = user;
      },
      (error) => {
        console.log(error);
      }
    )
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

  getTime(date: string): string {
    return date.split('T')[1].split(':')[0] + ':' + date.split('T')[1].split(':')[1];
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

  submitUpdatedLists(lists: any) {
    lists.forEach((list: any) => {
      this.viewListService.updateViewList(list._id, list).subscribe((data: any) => {
        this.toastr.success(`${list.name} updated successfully`, 'Success');
      }, (error) => {
        console.error(error);
        this.toastr.danger('An error occurred', 'Error');
      });
    });
  }

  addToList(film: any) {
    this.dialogService.open(DialogEnlistComponent, {context: {film: film, user: this.currentUser} })
        .onClose.subscribe(lists => lists && this.submitUpdatedLists(lists));
  }
}
