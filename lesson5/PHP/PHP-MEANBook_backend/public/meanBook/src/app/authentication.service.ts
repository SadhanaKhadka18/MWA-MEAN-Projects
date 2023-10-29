import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public setLoggedIn(username: string, password: string) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  }
  public getLoggedIn(): Boolean {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    return !!storedUsername && !!storedPassword;
  }
  public getUsername():string|null {
    const storedUsername = localStorage.getItem("username");
    return storedUsername||null;
  }
  constructor() { }
}
