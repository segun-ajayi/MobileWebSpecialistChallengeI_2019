import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieItemComponent } from './components/movie/movie-item/movie-item.component';
import {HttpClientModule} from '@angular/common/http';
import { MovieDetailsComponent } from './components/movie/movie-details/movie-details.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import { MovieSearchComponent } from './components/movie/movie-search/movie-search.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UserComponent } from './components/user/user/user.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateMovieComponent } from './components/movie/create-movie/create-movie.component';
import { CreateGenreComponent } from './components/movie/create-genre/create-genre.component';
import { FavoritesComponent } from './components/movie/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    MovieComponent,
    MovieItemComponent,
    MovieDetailsComponent,
    MovieSearchComponent,
    UserComponent,
    SignupComponent,
    ProfileComponent,
    CreateMovieComponent,
    CreateGenreComponent,
    FavoritesComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule
    ],
  providers: [MovieComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
