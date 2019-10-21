import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../../services/firestore.service';
import {ToastrService} from '../../../services/toastr.service';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent implements OnInit {
  createGenreForm: FormGroup;
  constructor(private fb: FormBuilder, private firebase: FirestoreService, private toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.createGenreForm = this.fb.group({
      title: ['', [Validators.required ]],
      imageUrl: ['', [Validators.required]],
    });
  }
  save(values) {
    this.firebase.saveGenre(values)
        .then(() => {
          this.createGenreForm.reset();
          this.toastr.success('Genre created successfully!');
        });
  }
}
