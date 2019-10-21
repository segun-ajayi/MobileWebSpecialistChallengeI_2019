import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Imovie} from '../common/imovies';
import {FirestoreService} from '../../../services/firestore.service';
import {ToastrService} from '../../../services/toastr.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites = [];
  uid;
  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private db: FirestoreService) { }

  ngOnInit() {
    this.authService.uid.subscribe(res => {
      this.uid = res;
      this.authService.getRole(res).subscribe(rest => {
        if (rest.payload.data().favorites) {
          const a = rest.payload.data().favorites;
          this.db.getMovies().subscribe(r => {
            r.forEach(i => {
              if (a.indexOf(i.payload.doc.id) > -1) {
                this.favorites.push(i);
              }
            });
          });
        } else {
          return false;
        }
      });
    });
  }
  remove(id) {
    this.authService.removeFavourite(this.uid, id).then(() => {
      this.toastr.success('Removed from favourites!');
    }).catch(error => {
      this.toastr.error(error.message);
    });
  }
}
