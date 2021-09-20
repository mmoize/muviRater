
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { BoardComponent } from './board/board.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NewpostComponent } from "./board/newpost/newpost.component";
import { PostmovieReviewComponent } from "./board/postmovie-review/postmovie-review.component";
import { ProfileComponent } from "./board/profile/profile.component";
import { MovieDetailComponent } from "./board/movie-detail/movie-detail.component";


const routes: Routes = [
  { path: '', component: BoardComponent,  canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'film-raters', component: LandingpageComponent }, 
  { path: 'new-movie-review', component: PostmovieReviewComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'movie-detail', component: MovieDetailComponent },
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
