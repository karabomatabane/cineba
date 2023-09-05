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
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionComponent } from './collection/collection/collection.component';
import { HomeComponent } from './home/home/home.component';
import { BookmarkComponent } from './bookmark/bookmark/bookmark.component';
import { AuthInterceptor } from './_interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    HomeComponent,
    BookmarkComponent,
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
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true, // Set multi to true to allow multiple interceptors
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
