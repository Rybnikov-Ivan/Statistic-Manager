import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  private routeSubscription!: Subscription;
  currentUser: User | undefined;

  username: any;

  constructor(private route: ActivatedRoute,
    private userService: UserService) {
      this.userService.loggedInUser$.subscribe(x => this.currentUser = x);
      this.routeSubscription = route.params.subscribe(params => this.username=this.currentUser?.username);
   }

  ngOnInit(): void {
  }

}
