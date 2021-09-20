import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BoardComponent } from './board/board.component';
import { MovieDetailComponent } from './board/movie-detail/movie-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewpostComponent } from './board/newpost/newpost.component';
import { AuthGuard } from './auth/auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingpageComponent } from './landingpage/landingpage.component';


import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './board/card/card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchbarComponent } from './board/searchbar/searchbar.component';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { PostmovieReviewComponent } from './board/postmovie-review/postmovie-review.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxLoadingXModule } from 'ngx-loading-x';
import { ProfileComponent } from './board/profile/profile.component';
import { MovieCardDetailComponent } from './board/movie-detail/movie-card-detail/movie-card-detail.component';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MovieDetailComponent,
    NewpostComponent,
    LandingpageComponent,
    AuthComponent,
    CardComponent,
    SearchbarComponent,
    PostmovieReviewComponent,
    ProfileComponent,
    MovieCardDetailComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    AuthModule,
    CommonModule,
    BrowserModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    FlexLayoutModule,
    ImagekitioAngularModule.forRoot({
      publicKey:"bso4or00jav",
      urlEndpoint: "https://ik.imagekit.io/bso4or00jav/",
      authenticationEndpoint: '',
    }),
    NgxLoadingXModule,
   

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
