import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _http: HttpClient) { }
  baseUrl = "http://localhost:3300/api/"

  private _getUserJson(user: User): any {
    return { "name": user.name, "username": user.username, "password": user.password }
  }

  public registerUser(user: User): Observable<User> {
    const url = this.baseUrl + "users/";
    const userToRegister=this._getUserJson(user);
    return this._http.post<User>(url, userToRegister);
  }
  public loginUser(user: User): Observable<User> {
    const url = this.baseUrl + "users/username";
    const userToLogin=this._getUserJson(user);
    return this._http.post<User>(url, userToLogin);
  }

}
