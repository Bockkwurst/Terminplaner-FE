import {Component} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {User} from "../../models/user";
import {RegisterService} from "../../services/register.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  user: User = {
    userId: '',
    username: '',
    password: '',
    appointments: []
  }

  constructor(
    private registerService: RegisterService,
    private router: Router) {
    this.user = new User();
  }

  onSubmit() {
    this.user.username = (document.getElementById('username') as HTMLInputElement).value;
    this.user.password = (document.getElementById('password') as HTMLInputElement).value;

    this.registerService.save(this.user).subscribe(result => {
      this.router.navigate(['/login']);
    });
  }
}
