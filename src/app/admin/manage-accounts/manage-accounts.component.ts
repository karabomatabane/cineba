import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DialogCodeFormComponent } from 'src/app/_modals/dialog-code-form/dialog-code-form.component';
import { AccountCode, NewAccountCode, User } from 'src/app/_models/auth.model';
import { Film } from 'src/app/_models/film.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {
  users: User[] = [];
  accountCode: AccountCode = {} as AccountCode;
  constructor(
    private authService: AuthService,
    private dialogService: NbDialogService,
    private toastr: NbToastrService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getAccountCode();
  }

  getUsers() {
    this.authService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, (error: any) => {
      console.log(error, this.authService.getToken());
    });
  }

  getAccountCode() {
    this.authService.getAccountCode().subscribe((accountCode: AccountCode) => {
      this.accountCode = accountCode;
    }, (error: any) => {
      console.log(error, this.authService.getToken());
      this.toastr.danger(error.error, 'Error');
    });
  }

  openNewCodeModal() {
    this.dialogService.open(DialogCodeFormComponent)
      .onClose.subscribe(code => code && this.submitAccountCode(code));
  }

  submitAccountCode(newAccountCode: NewAccountCode) {
    this.authService.createAccountCode(newAccountCode).subscribe((res) => {
      this.getAccountCode();
      this.toastr.success("New code added successfully", 'Success');
    }, (error: any) => {
      console.log(error);
      this.toastr.danger(error.error, 'Error');
    });
  }

  copyCode() {
    const el = document.createElement('textarea');
    el.value = this.accountCode.code;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.toastr.success('Code copied to clipboard', 'Success');
  }

  trimFilms(films: Film[]): string {
    return films.map(film => film.name).join(', ').slice(0, 20) + '...';
  }

  deleteUser(userId: string) {
    confirm('Are you sure you want to delete this user?') && this.authService.deleteUser(userId).subscribe((res) => {
      this.getUsers();
      this.toastr.success(res, 'Success');
    }, (error: any) => {
      console.log(error);
      this.toastr.danger(error.error, 'Error');
    });
  }
}
