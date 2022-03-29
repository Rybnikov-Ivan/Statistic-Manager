import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationForm } from '../model/application-form';
import { User } from '../model/user';
import { UserService } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class ApplicationService {
  currentUser: User | undefined;
  username!: string;
  routeSubscription!: Subscription;

  url = environment.API;
  endpoint = this.url + "/api/" + this.username;
  
  constructor(private http: HttpClient,
    private userService: UserService,
    private route: ActivatedRoute) { 
    this.userService.loggedInUser$.subscribe(x => this.currentUser = x);
    this.routeSubscription = route.params.subscribe(params => this.username!=this.currentUser?.username);
  }

  create(applicationForm: ApplicationForm): Observable<any> {
    return this.http.post(this.endpoint + "/create", applicationForm, httpOptions);
  }
}
