import { Component } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  games: any[] = [{
    _id: "123",
    title: "Catan",
    price: 39.99
  },{
    _id: "123",
    title: "Catan II",
    price: 39.99
  }]

}
