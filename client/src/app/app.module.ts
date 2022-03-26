import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LOCAL_STORAGE } from 'ngx-webstorage-service';
import { USER_SERVICE_STORAGE, UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { from } from 'rxjs';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { ResourceNotFoundInterceptor } from './interceptors/ResourceNotFoundInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClient
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResourceNotFoundInterceptor,
      multi: true
    },
    UserService,
    { provide: USER_SERVICE_STORAGE, useExisting: LOCAL_STORAGE }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
