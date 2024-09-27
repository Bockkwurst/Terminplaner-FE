import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public router: Router){}

}
