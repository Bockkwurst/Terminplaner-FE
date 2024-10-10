import {Component} from '@angular/core';
import {User} from "../../models/user";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/Auth.service";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user: User = {
    userId: '',
    username: '',
    password: '',
    appointments: []
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService) {

  }

  login() {
    console.log('login attempt with username: ' + this.user.username);
    this.authService.login(this.user.username, this.user.password).subscribe({
      next: (response) => {
        console.log('login successful, response: ' + response);
        this.router.navigate(['/table-view']);
      },
      error: (error) => {
        console.error('login failed, error: ' + error);
      }
    });
  }
}
