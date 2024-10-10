import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {InputFieldComponent} from "../components/input-field/input-field.component";
import {NavbarComponent} from "../components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    InputFieldComponent,
    NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Terminplaner';
}
