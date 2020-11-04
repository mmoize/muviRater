import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BoardComponent } from './board/board.component';
import { MovieDetailComponent } from './board/movie-detail/movie-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewpostComponent } from './board/newpost/newpost.component';



@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MovieDetailComponent,
    NewpostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
