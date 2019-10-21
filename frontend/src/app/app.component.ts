import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {MovieComponent} from './components/movie/movie.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    user: firebase.User;
  title = 'frontend';
  searchResult
  loginForm: FormGroup;
  searchForm: FormGroup;
  @Output() loggedIn = this.user;
  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder, private movie: MovieComponent) {}
  ngOnInit() {
      this.authService.getUser()
          .subscribe(user => {
             this.user = user;
          });
      this.createForm();
      this.createSearchForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }
    createSearchForm() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required ],
    });
  }
  logout() {
      this.authService.logout();
  }
  login(value) {
      this.authService.login(value.email, value.password);
  }
  search(val) {
      this.searchResult = this.movie.search(val);
  }
  reset() {
      this.searchResult = '';
      this.searchForm.reset();
  }
}
