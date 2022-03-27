import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LOCAL_STORAGE } from 'ngx-webstorage-service';
import { USER_SERVICE_STORAGE, UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMugHot, faHeart, faTh, faThList, faSignInAlt, faUserPlus, faPlaneDeparture, faMapMarked, 
  faSearch, faWindowClose, faPen,
  faHiking, faCalendarAlt, faArchway, faComments,
  faCogs, faEdit, faTrashAlt, faArrowCircleLeft, faSave,
  faUpload
} from '@fortawesome/free-solid-svg-icons';

import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { ResourceNotFoundInterceptor } from './interceptors/ResourceNotFoundInterceptor';
import { NavigationBarComponent } from './ui/navigation-bar/navigation-bar.component';

library.add(faHeart, faMugHot,
  faTh, faThList,
  faSignInAlt, faUserPlus,
  faPlaneDeparture, faMapMarked,
  faSearch, faWindowClose, faPen,
  faHiking, faCalendarAlt, faArchway, faComments,
  faCogs, faEdit, faTrashAlt, faArrowCircleLeft, faSave,
  faUpload
);

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    LogoutComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    HttpClientModule,
    FontAwesomeModule
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
