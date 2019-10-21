import {Component, Input, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() loggedIn;
  uid;
  isAdmin;
  constructor(private app: AppComponent, public authService: AuthService) { }
  ngOnInit() {
    this.authService.uid.subscribe(res => {
      this.uid = res;
      this.authService.getRole(res).subscribe(rest => {
        if (rest.payload.data().role) {
          this.isAdmin = rest.payload.data().role;
        } else {
          return false;
        }
      });
    });
  }

}
