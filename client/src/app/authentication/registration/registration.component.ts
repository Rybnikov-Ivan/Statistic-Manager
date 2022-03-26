import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceResponse } from 'src/app/model/service-response';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: any;
  serviceResponse!: ServiceResponse<any>;
  
  registrationError: boolean = false;
  registrationErrorMessage: string = '';
  internalServerError: boolean = false;

  constructor(private userService: UserService,
      private formBuilder: FormBuilder,
      private router: Router) {
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

  register():void {
    this.userService.register(this.registrationForm.value)
  }

}
