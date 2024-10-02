import {Routes} from '@angular/router';
import {InputFieldComponent} from "../components/input-field/input-field.component";
import {TableViewComponent} from "../components/table-view/table-view.component";
import {DetailsViewComponent} from "../components/details-view/details-view.component";
import {CalendarComponent} from "../components/calendar/calendar.component";

export const routes: Routes = [
  {path: '', redirectTo: 'table-view', pathMatch: 'full'},
  {path: 'create', component: InputFieldComponent},
  {path: 'table-view', component: TableViewComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'details/:id', component: DetailsViewComponent}
];
