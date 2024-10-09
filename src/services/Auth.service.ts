import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "./JwtPayload";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:5056/api/user/login';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) {
  }

  login(username: string | undefined, password: string | undefined): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.loginUrl, { username, password }, { headers })
      .pipe(
        map(response => {
          console.log('Login response:', response);
          if (response && response.token) {
            this.tokenService.setTokenAsCookie('jwt', response.token, 7);
          }
          if (response && response.user && response.user.UserGuid) {
            console.log('Setting UserGuid:', response.user.UserGuid);
            this.tokenService.setTokenAsCookie('UserGuid', response.user.UserGuid, 7);
          }
          console.log('Cookies after login:', document.cookie);
          return response;
        }),
      );
  }

  logout() {
    this.tokenService.deleteTokenCookie('jwt');
    this.tokenService.deleteTokenCookie('UserGuid');
  }

  getAuthToken(): string {
    return this.tokenService.getTokenFromCookie('jwt');
  }

  getUserId(): string | null {
    const token = this.getAuthToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: JwtPayload & { UserId: string } = jwtDecode(token);
      return decodedToken.UserId;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}
