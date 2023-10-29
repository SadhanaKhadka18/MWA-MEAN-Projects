import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { GamesDataService } from '../games-data.service';
import { Game } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game;
  constructor(private _router: Router, private _route: ActivatedRoute, private _gameDataService: GamesDataService) {
    this.game = new Game("", "", "", 0, 0, 0, 0, 0);
  }
  ngOnInit(): void {
    const gameId = this._route.snapshot.params["gameId"];
    this._gameDataService.getGame(gameId).subscribe(game => {
      this.game = new Game(game._id, game.title, game.year, game.rate, game.price, game.minPlayers, game.maxPlayers, game.minAge);
    })
  }
  deleteGame(): void {
    console.log("delete me");
    const gameId = this._route.snapshot.params["gameId"];
    this._gameDataService.deleteGame(gameId).subscribe(
      (game) => {
        console.log(game);
        this._router.navigate(['/games'])
      },
      (error) => {
        console.log(error)
      },
      () => {
        console.log("delete request completed");

      });

  }

}
