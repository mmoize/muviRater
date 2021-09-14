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
import { AuthGuard } from './auth/auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';






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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),



  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
