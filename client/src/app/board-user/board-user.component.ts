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
  currentUser: User | undefined;

  username: any;

  constructor(private route: ActivatedRoute,
    private userService: UserService) {
   }

  ngOnInit(): void {
  }

}
