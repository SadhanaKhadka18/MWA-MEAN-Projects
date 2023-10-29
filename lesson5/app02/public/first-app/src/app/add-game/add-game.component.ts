import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Game } from '../game.service';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  addGameForm!: FormGroup;
  constructor(private _formbuilder: FormBuilder, private _router: Router, private _gameDataService: GamesDataService) { }

  ngOnInit(): void {
    this.addGameForm = this._formbuilder.group(
      {
        title: [''],
        year: [''],
        rate: [''],
        price: [''],
        minPlayers: [''],
        maxPlayers: [''],
        minAge: ['']
      });
  }

  onAddGameFormSubmit() {
    if (this.addGameForm) {
      const gameFromForm = this.addGameForm.value;
      const newGame: Game = new Game("", gameFromForm.title, gameFromForm.year, gameFromForm.rate, gameFromForm.price, gameFromForm.minPlayers, gameFromForm.maxPlayers, gameFromForm.minAge);
      console.log(newGame);
      this._gameDataService.addGame(newGame).subscribe(
        (game) => {
          console.log('game added',game);
          this._router.navigate(['/games'])
        }
      )

    }
  }
}
