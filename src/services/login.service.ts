import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:5056/api/user/login'
  }

  public login(user: User){
    return this.http.post<User>(this.usersUrl, user);
  }
}
