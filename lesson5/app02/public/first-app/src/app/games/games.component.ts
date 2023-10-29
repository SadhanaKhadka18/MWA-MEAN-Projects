import { Component, OnInit } from '@angular/core';

import { Game } from '../game.service';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})

export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private _gameDataService: GamesDataService) { }


  ngOnInit(): void {

    this._gameDataService.getGames().subscribe(
      (games: any[]) => {
        this.games = games.map((game) => {
          return new Game(game._id, game.title, game.year, game.rate, game.price, game.minPlayers, game.maxPlayers, game.minAge)
        });
      }
    );

  }

}
