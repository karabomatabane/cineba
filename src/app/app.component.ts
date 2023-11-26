import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cineba!';
  items: NbMenuItem[] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private sidebarService: NbSidebarService,
    private meta: Meta
  ) {
    this.meta.addTag({ name: 'og:url', content: 'https://web.cineba.co.za' });
    this.meta.addTag({ name: 'og:type', content: 'website' });
    this.meta.addTag({ name: 'og:title', content: 'CineBa! Film Festival' });
    this.meta.addTag({ name: 'og:description', content: 'An annual film festival held in Bloemfontein, South Africa that celebrates African cinema.' });
    this.meta.addTag({ name: 'og:image', content: 'https://web.cineba.co.za/assets/brand.png' });
  }
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

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
          hidden: true
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
        {
          title: 'About',
          icon: 'info-outline',
          link: '/about',
          hidden: false
        },
      ]
    });
    this.authService.isAdmin$.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
      //add admin menu item at index 2
      this.items.splice(2, 0, {
        title: 'Admin',
        icon: 'settings-2-outline',
        link: '/admin',
        hidden: this.isAdmin ? false : true
      });
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
