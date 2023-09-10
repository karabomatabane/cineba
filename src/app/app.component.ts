import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'cineba';
  constructor(private authService : AuthService, private router : Router) { }
  isAuthenticated : boolean = false;
  isAdmin : boolean = false;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.authService.isAdmin$.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
