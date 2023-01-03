import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {DataService} from "../service/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nickname: string = "";
  password: string = "";

  constructor(private cookieService: CookieService, private dataService: DataService, private router: Router) {
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
    this.dataService.login().subscribe(
      (response) => {
        this.navigateToDashboard();
      },
      (error) => {
        console.log(error.error);
      }
    );
    // this.navigateToDashboard();
  }

  navigateToDashboard() {
    this.router.navigate(["dashboard"]).then();
  }
}
