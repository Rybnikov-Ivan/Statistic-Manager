import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceResponse } from 'src/app/model/service-response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  serviceResponse!: ServiceResponse<any>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.userService.logout().subscribe(
        res => {
          this.serviceResponse = res;
          if (this.serviceResponse.responseCode == "OK") {
            this.router.navigate(['']);
          }
        }
    );
  }
}
