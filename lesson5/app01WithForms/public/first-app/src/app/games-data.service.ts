import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Game } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
  baseUrl = "http://localhost:4000/api/";

  constructor(private _http: HttpClient) { }

  public getGames(): Observable<any[]> {
    const url = this.baseUrl + 'games?count=10';
    return this._http.get<any[]>(url);
  }


  public getGame(id: string): Observable<Game> {
    const url = this.baseUrl + 'games/' + id + '?count=10';
    return this._http.get<Game>(url);
  }

  public deleteGame(id: string): Observable<any> {
    const url = this.baseUrl + 'games/' + id;
    return this._http.delete<any>(url);
  }

}
