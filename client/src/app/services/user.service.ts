import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationForm } from '../model/registration-form';
import { User } from '../model/user';

const STORAGE_KEY = 'current-user';
export const USER_SERVICE_STORAGE =
    new InjectionToken<StorageService>('USER_SERVICE_STORAGE');

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUserSubject: BehaviorSubject<User>;
  public loggedInUser$: Observable<User>;

  url = environment.API;
  endpoint = this.url + "/user";

  constructor(private http: HttpClient,
    @Inject(USER_SERVICE_STORAGE) private storage: StorageService){
      this.loggedInUserSubject = new BehaviorSubject<User>(this.getUserFromStorage());
      this.loggedInUser$ = this.loggedInUserSubject.asObservable();
    }
    
  register(registrationForm: RegistrationForm): Observable<any> {
    return this.http.post(this.endpoint + "/register", registrationForm, httpOptions);
  }

  public setLoggedUser(loggedUser?: User):void {
    this.storage.set(STORAGE_KEY, loggedUser);
    this.loggedInUserSubject.next(this.getUserFromStorage());
  }

  private getUserFromStorage(): User {
    const currentUser: User = this.storage.get(STORAGE_KEY) || null;
    return currentUser;
  }

  logout():Observable<any> {
    return this.http.get(this.endpoint + "/logout")
    .pipe(
      map(res => {
        this.setLoggedUser(null!);
        return res;
      }),
        catchError(error => {
          return of(error);
    }));
  }

  login(user:User):Observable<any> {
  return this.http.post(this.endpoint + "/login", user)
    .pipe(
      map(res => {
        return res;
      }),
      catchError(error => {
        return throwError(error);
    }));
  }

}
