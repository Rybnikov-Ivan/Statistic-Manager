import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceResponse } from 'src/app/model/service-response';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: any;
  serviceResponse?: ServiceResponse<any>;
  
  registrationError: boolean = false;
  registrationErrorMessage: string = '';
  internalServerError: boolean = false;
  isSuccesfull: boolean = false;

  userIcon = faUserPlus;
  constructor(private userService: UserService,
      private formBuilder: FormBuilder,
      private router: Router,
      private _snackBar: MatSnackBar) {
        this.registrationForm = this.formBuilder.group({
          'username': ['', [Validators.required, Validators.minLength(4)]],
          'email': ['', [Validators.required, ValidationService.emailValidator]],
          'password': ['', [Validators.required, ValidationService.passwordValidator]],
          'confirmPassword': ['', Validators.required]
        }, {
            validator: ValidationService.passwordMismatchValidator
        });
      
      }
  ngOnInit() {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  register(): void {
    this.userService.register(this.registrationForm.value).subscribe(
      res => {
        this.serviceResponse = res;
        console.log(res);
        if(res.responseCode != "OK") {
          this.registrationError = true;
          this.registrationErrorMessage = this.serviceResponse?.responseMessage!;
        } else {
          this.isSuccesfull = true;
          this.openSnackBar('регистрация прошла успешно', 'закрыть');
        }
      }, err => {
        this.internalServerError = true;
      }
    )
  }

}
