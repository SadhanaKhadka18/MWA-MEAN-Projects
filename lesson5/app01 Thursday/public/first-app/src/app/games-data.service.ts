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

  public getGames(): Observable<Game[]> {
    const offset = Math.floor(Math.random() * 10) + 1;
    const url = this.baseUrl + 'games?count=10&&offset=' + offset;
    return this._http.get<Game[]>(url);
  }


  public getGame(id: string): Observable<Game> {
    console.log(id);
    const url = this.baseUrl + 'games/id?count=10';
    return this._http.get<Game>(url);
  }

}
