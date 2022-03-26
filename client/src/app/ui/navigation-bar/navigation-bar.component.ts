import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServiceResponse } from 'src/app/model/service-response';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  currentUser: User | undefined;
  serviceResponse: ServiceResponse<User> | undefined;
  ngOnInit() {}
  constructor(private userService: UserService,
              private router: Router,
              private titleService: Title) 
              { this.userService.loggedInUser$.subscribe(x => this.currentUser = x); }

  public setTitle(newTitle: string) {
      this.titleService.setTitle( newTitle );
  }

  logout(): void {
      this.userService.logout().subscribe(
          res => {
              console.log(JSON.stringify(res));
              this.serviceResponse = res;
              if (this.serviceResponse!.responseCode == "OK") {
                  this.userService.setLoggedUser(null!);
              }
          }
      );
  }
}
