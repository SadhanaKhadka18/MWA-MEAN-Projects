import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesDataService } from '../games-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../game.service';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.css']
})
export class UpdateGameComponent implements OnInit {
  updateGameForm!: FormGroup;
  game!: Game;
  constructor(private _formBuilder: FormBuilder, private _gameDataService: GamesDataService, private _router: Router, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const gameId = this._route.snapshot.params["gameId"];
    this._gameDataService.getGame(gameId).subscribe(game => {
      this.game = (new Game(game._id, game.title, game.year, game.rate, game.price, game.minPlayers, game.maxPlayers, game.minAge));
      console.log(this.game);
      this.updateGameForm = this._formBuilder.group({
        title: [this.game.title],
        year: [this.game.year],
        rate: [this.game.rate],
        price: [this.game.price],
        minPlayers: [this.game.minPlayers],
        maxPlayers: [this.game.maxPlayers],
        minAge: [this.game.minAge]
      });
    })
    this.updateGameForm = this._formBuilder.group({
      title: [''],
      year: [''],
      rate: [''],
      price: [''],
      minPlayers: [''],
      maxPlayers: [''],
      minAge: ['']
    });

  }


  onUpdateGameFormSubmit() {
    if (this.updateGameForm) {
      const gameId = this._route.snapshot.params["gameId"];
      const gameFromForm = this.updateGameForm.value;
      const newGame: Game = new Game("", gameFromForm.title, gameFromForm.year, gameFromForm.rate, gameFromForm.price, gameFromForm.minPlayers, gameFromForm.maxPlayers, gameFromForm.minAge);
      console.log(newGame, gameId);
      this._gameDataService.updateGame(gameId,newGame).subscribe(
      {
        next: (game) => {
          console.log('game Updated',game);
          this._router.navigate(['/games/'])
        }
      }
      );

    }
  }

}
