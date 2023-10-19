import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'cineba!';
  items: NbMenuItem[] = [];

  constructor(private authService : AuthService, 
    private router : Router,
    private sidebarService: NbSidebarService) { }
  isAuthenticated : boolean = false;
  isAdmin : boolean = false;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      this.items = [
        {
          title: 'Home',
          icon: 'home-outline',
          home: true,
          link: '/home',
          hidden: false
        },
        {
          title: 'Bookmarks',
          icon: 'bookmark-outline',
          link: '#',
          hidden: this.isAuthenticated ? false : true
        },
        {
          title: 'Login',
          icon: 'log-in-outline',
          link: '/login',
          hidden: this.isAuthenticated ? true : false
        },
        {
          title: 'Signup',
          icon: 'person-add-outline',
          link: '/register',
          hidden: this.isAuthenticated ? true : false
        },
        {
          title: 'Logout',
          icon: 'log-out-outline',
          link: '/logout',
          hidden: this.isAuthenticated ? false : true
        },
      ]
    });
    this.authService.isAdmin$.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
