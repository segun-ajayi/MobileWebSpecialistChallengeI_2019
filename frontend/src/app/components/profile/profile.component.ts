import {Component, Input, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() user;
  constructor(private app: AppComponent) { }

  ngOnInit() {
  }
  logout() {
    this.app.logout();
  }
}
