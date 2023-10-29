import { Injectable, OnInit } from '@angular/core';


export class Game {
  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;

  get id() { return this.#_id };
  get year() { return this.#year };
  get rate() { return this.#rate };
  get price() { return this.#price };
  get minPlayers() { return this.#minPlayers };
  get maxPlayers() { return this.#maxPlayers };
  get minAge() { return this.#minAge };
  set title(title: string) {
    this.#title = title;
  }
  set price(price: number) { this.#price = price; }

  constructor(data: any) {
    this.#_id = data._id;
    this.#title = data.title;
    this.#price = data.price;
  }
}
