import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable()
export class Auth implements HttpInterceptor {
  constructor(private cookieService: CookieService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: new HttpHeaders({
        'nickname': this.cookieService.get("nickname"),
        'password': this.cookieService.get("password")
      })
    });
    console.log(req)
    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err.status === 401) {
          this.router.navigate(["login"]).then();
        }
        return throwError(err);
      })
    );
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: Auth, multi: true},
];
