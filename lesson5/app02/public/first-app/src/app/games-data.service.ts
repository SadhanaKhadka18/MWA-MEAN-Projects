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
    const offset = Math.floor(Math.random() * 10) + 1;
    const url = this.baseUrl + 'games?count=10';
    return this._http.get<any[]>(url);
  }
  public getGame(id: string): Observable<any> {
    const url = this.baseUrl + 'games/' + id ;
    return this._http.get<any>(url);
  }
  public deleteGame(id: string): Observable<any> {
    const url = this.baseUrl + 'games/' + id;
    return this._http.delete<any>(url);
  }
  public addGame(newGame :Game): Observable<Game> {
    const url = this.baseUrl + 'games';
    const gameToAdd={"title":newGame.title,"year":newGame.year,"rate":newGame.rate,"price":newGame.price,"minPlayers":newGame.minPlayers,"maxPlayers":newGame.maxPlayers,"minAge":newGame.minAge};
    return this._http.post<Game>(url,gameToAdd);
  }
  public updateGame(id:string,newGame :Game): Observable<Game> {
    const url = this.baseUrl + 'games/'+id;
    const gameToUpdate={"title":newGame.title,"year":newGame.year,"rate":newGame.rate,"price":newGame.price,"minPlayers":newGame.minPlayers,"maxPlayers":newGame.maxPlayers,"minAge":newGame.minAge};
    return this._http.patch<Game>(url,gameToUpdate);
  }
}
