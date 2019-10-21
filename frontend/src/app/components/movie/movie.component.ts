import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../../services/firestore.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: any
  genre: any
  sort = 'all';
  title = 'All';
  visibleMovies = [];
  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
    this.firestore.getMovies().subscribe(res => {
      this.movies = res;
      this.visibleMovies = this.movies;
      // console.log(this.movies[0].payload.doc.data().genre);
    });
    this.firestore.getGenre().subscribe(res => {
      this.genre = res;
    });
    // this.sortBy('All');
  }

  sortBy(param) {
    const para = param.toLocaleLowerCase();
    this.sort = param;
    this.title = param;
    if (param === 'All') {
      this.visibleMovies = this.movies.slice(0);
    } else {
      this.visibleMovies = this.movies.filter(movie => {
        return movie.payload.doc.data().genre.includes(para);
      });
    }
  }
  search(param) {
    const para = param.search.toLocaleLowerCase();
    const result = [];
    this.firestore.getMovies().subscribe(res => {
      res.forEach(movie => {
        if (movie.payload.doc.data().title.toLocaleLowerCase().indexOf(para) > -1) {
          result.push(movie);
        }
      });
    });
    return result;
  }
}
