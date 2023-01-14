import {Component, OnInit} from '@angular/core';
import {AuthService} from "./data/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'classSchedulerFrontend';

  constructor(public authService: AuthService) {
    if (!authService.isLoggedIn()) {
      authService.login();
    }
  }

  ngOnInit() {

  }
}
