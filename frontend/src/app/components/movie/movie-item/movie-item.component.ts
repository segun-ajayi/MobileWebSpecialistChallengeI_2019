import { Component, OnInit, Input } from '@angular/core';
import {Imovie} from '../common/imovies';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Imovie
  constructor() { }

  ngOnInit() {
  }
}
