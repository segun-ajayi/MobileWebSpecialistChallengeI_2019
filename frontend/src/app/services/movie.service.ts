import { Injectable } from '@angular/core';
import {Igenre} from '../components/movie/common/imovies';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private db: AngularFirestore) { }
  getMovies() {
    return this.db.collection('movies').snapshotChanges();
  }
}

