import { Routes } from '@angular/router';
import {MovieComponent} from './components/movie/movie.component';
import {MovieDetailsComponent} from './components/movie/movie-details/movie-details.component';
import {SliderComponent} from './components/slider/slider.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {CreateMovieComponent} from './components/movie/create-movie/create-movie.component';
import {FavoritesComponent} from './components/movie/favorites/favorites.component';

export const appRoutes: Routes = [
    { path: 'home', component: SliderComponent },
    { path: 'register', component: SignupComponent },
    { path: 'movies', component: MovieComponent },
    { path: 'movie/get/:id', component: MovieDetailsComponent },
    { path: 'movies/favorites', component: FavoritesComponent },
    { path: 'create-movies', component: CreateMovieComponent },
    { path: 'movie/:id', component: MovieDetailsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
