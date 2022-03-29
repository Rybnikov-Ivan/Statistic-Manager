import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ServiceResponse } from 'src/app/model/service-response';
import { ApplicationService } from 'src/app/services/application.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-designer-application',
  templateUrl: './designer-application.component.html',
  styleUrls: ['./designer-application.component.css']
})
export class DesignerApplicationComponent implements OnInit {
  appForm: any;
  serviceResponse?: ServiceResponse<any>;

  addIcon = faPlus;

  applicationError: boolean = false;
  applicationErrorMessage: string = '';
  constructor(private _formBuilder: FormBuilder,
    private _appService: ApplicationService,
    private _snackBar: MatSnackBar) { 

    this.appForm = this._formBuilder.group({
      'name': ['', [Validators.required, ValidationService.nameValidator]]
    });
  }

  ngOnInit(): void {
  }
  
  create(): void {
    this._appService.create(this.appForm.value).subscribe(
      res => {
        this.serviceResponse = res;
        console.log(res);
        if(res.responseCode != "OK") {
          this.applicationError = true;
          this.applicationErrorMessage = this.serviceResponse?.responseMessage!;
        } else {
          this.openSnackBar('Приложение создано', 'закрыть');
        }
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
