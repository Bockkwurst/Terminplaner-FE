import { Routes } from '@angular/router';
import {InputFieldComponent} from "../components/input-field/input-field.component";
import {TableViewComponent} from "../components/table-view/table-view.component";
import {DetailsViewComponent} from "../components/details-view/details-view.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'create', component: InputFieldComponent},
  {path: 'home', component: TableViewComponent},
  {path: 'details', component: DetailsViewComponent}
];
