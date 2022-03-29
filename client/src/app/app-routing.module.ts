import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { PanelApplicationsComponent } from './board-user/panel-applications/panel-applications.component';

const routes: Routes = [
  { path: '', redirectTo: 'api/main', pathMatch: 'full' },
  { path: 'api/main', component: MainComponent },
  { path: 'api/login', component: LoginComponent },
  { path: 'api/register', component: RegistrationComponent },
  { path: 'api/:username', component: BoardUserComponent, 
  children: [
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'main', pathMatch: 'full' }, 
    { path: 'main', component: MainComponent}, 
    { path: 'applications', component: PanelApplicationsComponent }
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
