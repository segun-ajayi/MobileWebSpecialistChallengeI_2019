import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {ToastrService} from '../../../services/toastr.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
      this.auth.eventAuthError$.subscribe(data => {
         this.toastr.error(data.message);
      });
      this.createForm();
  }
  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      fullname: [''],
    });
  }
  doSignup(values) {
    this.auth.doRegister(values);
  }
}
