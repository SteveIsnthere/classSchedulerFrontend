import {Injectable} from '@angular/core';
import {Member} from "./models/Member";
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  self: Member | null = null;
  isAdmin: boolean = false;
  url: string;
  wrongTries: number = 0;


  constructor(private dataService: DataService, private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.url = dataService.url;
  }


  login() {
    this.http.get(this.url + "member/" + this.cookieService.get("nickname"), {withCredentials: true}).subscribe(
      (response) => {
        this.self = response as Member;
        this.wrongTries = 0;
        this.router.navigate(["dashboard"]).then();
      },
      (error) => {
        this.wrongTries++;
        this.logout()
        console.log("login failed");
      }
    );
  }

  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(["login"]).then();
    this.self = null;
  }

  isLoggedIn() {
    return this.self != null;
  }
}
