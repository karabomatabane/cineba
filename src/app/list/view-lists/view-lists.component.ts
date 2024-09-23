import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ViewList } from 'src/app/_models/list.model';
import { AuthService } from 'src/app/_services/auth.service';
import { ListService } from 'src/app/_services/list.service';
import { DialogListFormComponent } from '../new-view-list/dialog-list-form.component';
import { User } from 'src/app/_models/auth.model';

@Component({
  selector: 'app-view-lists',
  templateUrl: './view-lists.component.html',
  styleUrls: ['./view-lists.component.css']
})
export class ViewListsComponent implements OnInit {
  viewLists: ViewList[] = [];
  searchText: string = '';
  onlyByMe: boolean = false;
  saved: boolean = false;
  sortBy: string = '';
  isAuthenticated: boolean = false;
  currentUser: User = {} as User;
  loading: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    private toastr: NbToastrService,
    private authService: AuthService,
    private viewListService: ListService,
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.getUserDetails();
      }
    });
    this.getViewLists();
  }


  submitViewList(viewList: Partial<ViewList>) {
    viewList.lastUpdated = new Date();
    viewList.owner = { _id: this.authService.getUserId() || "Anonymous", username: this.currentUser.username || "Anonymous" };
    viewList.members = [ { user: { id: this.authService.getUserId() || "Anonymous", username: this.currentUser.username || "Anonymous" }, status: 'owner' } ];
    this.viewListService.createViewList(viewList).subscribe(
      (data) => {
        this.toastr.success("View list sent successfully", 'Success');
        console.log("Refreshing view lists");
        this.getViewLists();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  openListFormModal() {
    if (!this.isAuthenticated) {
      this.toastr.warning("Please login to create view list", 'Warning');
      return;
    }
    this.dialogService.open(DialogListFormComponent)
      .onClose.subscribe(viewList => viewList && this.submitViewList(viewList));
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

  getViewLists() {
    this.viewListService.getViewLists().subscribe(
      (data) => {
        this.viewLists = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onFilterChange() {
    this.loading = true;
    this.viewListService.getViewLists(this.onlyByMe, this.saved).subscribe(
      (data) => {
        this.viewLists = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    )
  }

  onSortChange() {
    this.loading = true;
    this.viewLists = this.viewLists.sort((a, b) => {
      if (this.sortBy === 'likes') {
        return b.likes.length - a.likes.length;
      } else {
        // sort by name
        return a.name.localeCompare(b.name);
      }
    });
    this.loading = false;
  }

  searchList() {
    console.log('search list')
  }
}
