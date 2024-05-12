import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { NewFilmComponent } from './film/new-film/new-film.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { TabsComponent } from './admin/tabs/tabs.component';
import { LogoutComponent } from './admin/logout/logout.component';
import { FilmDetailsComponent } from './film/film-details/film-details.component';
import { AboutComponent } from './about/about/about.component';
import { ViewListDetailComponent } from './list/view-list-detail/view-list-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to '/home'
  { path: 'home', component: HomeComponent }, // Home route
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout',  component: LogoutComponent },
  { path: 'about',  component: AboutComponent },
  { path: 'new-film', component: NewFilmComponent, canActivate: [AuthGuard] },
  { path: 'film/:id', component: FilmDetailsComponent },
  { path: 'view-list/:id', component: ViewListDetailComponent },
  { path: 'admin', component: TabsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', redirectTo: '/home' } // Redirect all other paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
