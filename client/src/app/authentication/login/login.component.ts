import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceResponse } from 'src/app/model/service-response';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { NavigationBarComponent } from 'src/app/ui/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  user?: User;
  loginForm: any;

  serviceResponse: ServiceResponse<User> | undefined;

  loginError: boolean = false;
  internalServerError: boolean = false;
  loginIcon = faSignInAlt;

  constructor(private userService:UserService,
              private formBuilder:FormBuilder,
              private router:Router,
              private route: ActivatedRoute,
              private cookieService:CookieService) {

                this.loginForm = this.formBuilder.group({
                  'username': ['', [Validators.required]],
                  'password': ['', [Validators.required]]
              });
               }

  ngOnInit(): void {
  }

  login():void {
    this.userService.login(this.loginForm.value).subscribe(
      res => {
        this.serviceResponse = res;
        console.log(res);
        if (this.serviceResponse?.responseCode != "OK") {
          this.loginError = true;
        } else {
          this.userService.setLoggedUser(this.serviceResponse.responseObject);
          this.user = this.userService.getUserFromStorage();
          this.router.navigate(['/api/', this.user?.username]);
        }
      },
      error => {
        this.internalServerError = true;
      }
    );
  }
}
