import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable, throwError, of } from "rxjs";
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  baseUrl = "http://localhost:8080/api/login";

    constructor(private userService: UserService, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (request.url === this.baseUrl) {
        return next.handle(request);
      }
      const clonedRequest =
        request.clone(
          { withCredentials: true }
        );
      return next.handle(clonedRequest)
      .pipe(
        map((event:HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log("Http Response event... " + event.status);
          }
          return event;
          }),
          catchError(error => {
            console.log("Error response status: ", error.status);
            if (error.status === 401) {
              this.router.navigateByUrl("api/login");
            }
            return throwError(error);
            }));
      }
}