import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FirestoreService} from '../../../services/firestore.service';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from '../../../services/toastr.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any
  id: string
  uid: string
  constructor(private route: ActivatedRoute,
              private firestore: FirestoreService,
              private authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.authService.uid.subscribe(res => {
      this.uid = res;
    });
    this.route.params.forEach((params: Params) => {
      this.id = params.id;
      this.firestore.getMovie(params.id)
          .subscribe(movie => {
            this.movie = movie.payload.data();
          });
    });
  }
  addFavourite() {
    this.authService.addFavourite(this.uid, this.id).then(() => {
      this.toastr.success('Added to favourites!');
    }).catch(error => {
      this.toastr.error(error.message);
    });
  }

}
