import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { User } from 'src/app/_models/auth.model';
import { Film } from 'src/app/_models/film.model';
import { ViewList } from 'src/app/_models/list.model';
import { ListService } from 'src/app/_services/list.service';

@Component({
  selector: 'app-dialog-enlist',
  templateUrl: './dialog-enlist.component.html',
  styleUrls: ['./dialog-enlist.component.css']
})
export class DialogEnlistComponent implements OnInit {
  @Input() film: Film = {} as Film;
  @Input() user: User = {} as User;
  lists: ViewList[] = [];
  updatedLists: ViewList[] = [];

  constructor(public dialogRef: NbDialogRef<DialogEnlistComponent>,
    private viewListService: ListService
  ) { }

  ngOnInit(): void {
    this.getUserLists();
    console.log("Updated lists", this.updatedLists);
  }

  getUserLists() {
    this.viewListService.getViewLists().subscribe((data: any) => {
      this.lists = data;
    }, (error) => {
      console.error(error);
    });
  }

  onSubmit() {
    this.dialogRef.close(this.updatedLists); // Pass the vieList data to the parent component
  }

  onCancel() {
    this.dialogRef.close();
  }

  isSelected(list: ViewList): boolean {
    return list.films.some((f) => f._id === this.film._id);
  }

  toggleSelection(list: ViewList, event: any) {
    if (event.target.checked) {
      list.films.push(this.film);
      this.updatedLists.push(list);
    } else {
      console.log("Removing film from list", this.film);
      list.films = list.films.filter(f => f._id !== this.film._id);
      console.log("Updated list", list);
      this.updatedLists = this.updatedLists.filter(l => l._id !== list._id);
      this.updatedLists.push(list);
    }
  }

}
