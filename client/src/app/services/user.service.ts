import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

const STORAGE_KEY = 'current-user';
// export const USER_SERVICE_STORAGE =
//     new InjectionToken<StorageService>('USER_SERVICE_STORAGE');
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private loggedInUserSubject: BehaviorSubject<User>;
  // public loggedInUser$: Observable<User>;

  url = environment.API;
  endpoint = this.url + "/user";

  constructor(private http: HttpClient,
    @Inject(USER_SERVICE_STORAGE) private storage: StorageService){
    }
    
  register(registrationForm: RegistrationForm):Observable<any> {
    return this.http.post(this.endpoint + "/register", registrationForm)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
}
}
