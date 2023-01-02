import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nickname: string = "";
  password: string = "";

  constructor(private cookieService: CookieService, private dataService: DataService) {
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
    this.dataService.login().subscribe((data: any) => {
      if (data == "You shall pass") {
        alert("You shall pass");
      } else {
        alert("You shall not pass");
      }
    })
  }


}
