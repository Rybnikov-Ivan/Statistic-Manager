import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password, it must be at least 6 characters long and contain a number',
      'passwordMismatch': 'Passwords do not match',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };
    return config[validatorName as keyof typeof config]
  }

  static emailValidator(control: { value: string; }) {
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }
  static passwordValidator(control: { value: string; }) {
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
  static passwordMismatchValidator(control: AbstractControl) {
    let password = control.get('password')?.value;
    let confirmPassword = control.get('confirmPassword')?.value;
    if(password != confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
  }
}
