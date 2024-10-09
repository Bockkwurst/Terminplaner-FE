import {Routes} from '@angular/router';
import {InputFieldComponent} from "../components/input-field/input-field.component";
import {TableViewComponent} from "../components/table-view/table-view.component";
import {DetailsViewComponent} from "../components/details-view/details-view.component";
import {CalendarComponent} from "../components/calendar/calendar.component";
import {AuthService} from "../services/Auth.service";
import {AuthGuard} from "../services/AuthGuard";
import {LoginComponent} from "../components/login/login.component";
import {RegisterComponent} from "../components/register/register.component";
import {HomeComponent} from "../components/home/home.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'create', component: InputFieldComponent, canActivate:[AuthGuard]},
  {path: 'table-view', component: TableViewComponent, canActivate:[AuthGuard]},
  {path: 'calendar', component: CalendarComponent, canActivate:[AuthGuard]},
  {path: 'details/:id', component: DetailsViewComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent}
];
