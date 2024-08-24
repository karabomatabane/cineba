import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  NbLayoutModule,
  NbThemeModule,
  NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbTabsetModule,
  NbActionsModule,
  NbButtonGroupModule,
  NbIconModule,
  NbFormFieldModule,
  NbToastrModule,
  NbTimepickerModule,
  NbGlobalPhysicalPosition,
  NbGlobalLogicalPosition,
  NbSidebarModule,
  NbMenuModule,
  NbSidebarService,
  NbSpinnerModule,
  NbAccordionModule,
  NbDialogService,
  NbDialogModule,
  NbOptionModule,
  NbSelectModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionComponent } from './collection/collection/collection.component';
import { HomeComponent } from './home/home/home.component';
import { BookmarkComponent } from './bookmark/bookmark/bookmark.component';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { NewFilmComponent } from './film/new-film/new-film.component';
import { TabsComponent } from './admin/tabs/tabs.component';
import { FilmDetailsComponent } from './film/film-details/film-details.component';
import { LogoutComponent } from './admin/logout/logout.component';
import { DialogReviewFormComponent } from './_modals/dialog-review-form/dialog-review-form.component';
import { ManageAccountsComponent } from './admin/manage-accounts/manage-accounts.component';
import { DialogCodeFormComponent } from './_modals/dialog-code-form/dialog-code-form.component';
import { AboutComponent } from './about/about/about.component';
import { FullListComponent } from './admin/full-list/full-list.component';
import { BannerComponent } from './home/banner/banner.component';
import { ViewListsComponent } from './list/view-lists/view-lists.component';
import { ViewListDetailComponent } from './list/view-list-detail/view-list-detail.component';
import { DialogListFormComponent } from './list/new-view-list/dialog-list-form.component';
import { ListCardComponent } from './list/list-card/list-card.component';
import { AddFilmsComponent } from './list/add-films/add-films.component';
import { DialogEnlistComponent } from './list/dialog-enlist/dialog-enlist.component';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    HomeComponent,
    BookmarkComponent,
    RegisterComponent,
    LoginComponent,
    NewFilmComponent,
    TabsComponent,
    FilmDetailsComponent,
    LogoutComponent,
    DialogReviewFormComponent,
    ManageAccountsComponent,
    DialogCodeFormComponent,
    AboutComponent,
    FullListComponent,
    BannerComponent,
    ViewListsComponent,
    ViewListDetailComponent,
    DialogListFormComponent,
    ListCardComponent,
    AddFilmsComponent,
    DialogEnlistComponent,
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbButtonGroupModule,
    NbEvaIconsModule,
    NbIconModule,
    NbFormFieldModule,
    NbToastrModule.forRoot({
      position: NbGlobalLogicalPosition.BOTTOM_END, // Position of the Toastr notification
      preventDuplicates: true, // Prevent duplicate notifications
    }),
    NbTimepickerModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSpinnerModule,
    NbAccordionModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbOptionModule,
    NbSelectModule,
    NbCheckboxModule,
    CarouselModule.forRoot(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true, // Set multi to true to allow multiple interceptors
  },NbSidebarService, NbDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
