import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {AuthService} from "../../services/Auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatButtonToggleGroup,
    MatButtonToggle,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isTableView: boolean = true;

  constructor(
    public router: Router,
    public authService: AuthService) {
  }

  onToggleChange(event: MatButtonToggleChange) {
    this.isTableView = event.value === 'table';
    if (this.isTableView) {
      this.router.navigate(['/table-view']);
    } else {
      this.router.navigate(['/calendar']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
