import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../game.service';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game
  constructor(private _route: ActivatedRoute, private _gameDataService: GamesDataService) {
    this.game = new Game(null)
  }
  ngOnInit(): void {
    
    const gameId = this._route.snapshot.params["gameId"];
    this._gameDataService.getGame(gameId).subscribe(game=>{
      this.game=game;
    })
  }
}
