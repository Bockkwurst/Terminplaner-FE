import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() {
  }

  setTokenAsCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires= " + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  getTokenFromCookie(name: string): string {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length);
      }
    }
    return "";
  }

  deleteTokenCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
