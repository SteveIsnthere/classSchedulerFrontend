import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {AuthService} from "../data/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nickname: string = "Steve1984";
  password: string = "test";

  hidePassword: boolean = true;


  constructor(private cookieService: CookieService, public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    let savedNickname = this.cookieService.get("nickname");
    if (savedNickname != "") {
      this.nickname = savedNickname;
    }

    let savedPassword = this.cookieService.get("password");
    if (savedPassword != "") {
      this.password = savedPassword;
    }
  }

  login() {
    this.cookieService.set("nickname", this.nickname);
    this.cookieService.set("password", this.password);
    this.authService.login();
  }

}
