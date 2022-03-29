import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceResponse } from 'src/app/model/service-response';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  public currentUser: User | undefined;
  username: any;
  serviceResponse: ServiceResponse<User> | undefined;
  private routeSubscription!: Subscription;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private titleService: Title) 
              { this.userService.loggedInUser$.subscribe(x => this.currentUser = x);
                this.routeSubscription = route.params.subscribe(params => this.username=params['username']);
                 
  }

  ngOnInit() {
    //this.currentLink();
  }
  
  public setTitle(newTitle: string) {
      this.titleService.setTitle( newTitle );
  }

  // currentLink(): void {
  //   this.sub = this.route.params.subscribe(params => {
  //     this.username = this.currentUser?.username;
  //   });
  // }

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
