import { Injectable } from '@angular/core';


export class Location {
  #_id!: string;
  #state!: string;
  #city!: string;
  #zip!: string;
  #street!: string;

  get id() { return this.#_id };
  get state() { return this.#state };
  get city() { return this.#city };
  get zip() { return this.#zip };
  get street() { return this.#street };

  set state(state: string) { this.#state = state };
  set city(city: string) { this.#city = city };
  set zip(zip: string) { this.#zip = zip };
  set street(street: string) { this.#street = street };

  constructor(id: string, state: string, city: string, zip: string, street: string) {
    this.#_id = id;
    this.#state = state;
    this.#city = city;
    this.#zip = zip;
    this.#street = street;
  }
}
