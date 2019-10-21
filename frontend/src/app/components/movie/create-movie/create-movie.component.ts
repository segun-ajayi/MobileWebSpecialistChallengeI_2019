import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../../services/firestore.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from '../../../services/toastr.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  private eventStoreError = new BehaviorSubject<string>('');
  eventStoreError$ = this.eventStoreError.asObservable();
  createMovieForm: FormGroup;
  genre = [];
  constructor(private fb: FormBuilder, private firestore: FirestoreService, private toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.createMovieForm = this.fb.group({
      title: ['', [Validators.required]],
      language: ['', [Validators.required]],
      image: ['', [Validators.required]],
      director: ['', [Validators.required]],
      runtime: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      releaseYear: ['', [Validators.required]],
      writer: ['', [Validators.required]],
      actors: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  save(val) {
    val.genre = this.genre;
    this.firestore.saveMovie(val)
        .then(() => {
          this.createMovieForm.reset();
          this.toastr.success('Movie added successfully!');
        }).catch(error => {
        this.toastr.error(error.message);
    });
  }
  check(event: boolean, val: string) {
    if (event) {
      this.genre.push(val);
    } else {
      const arr = this.genre.filter(e => e !== val);
      this.genre = arr;
    }
  }
}
