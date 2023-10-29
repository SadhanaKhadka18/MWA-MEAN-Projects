import { Injectable } from '@angular/core';
import { Location } from './location.service';


export class JobOpening {
  #_id!: string;
  #title!: string;
  #salary!: number;
  #location!: Location;
  #description!: string;
  #experience!: string;
  #skills!: string[];
  #postDate!: Date;

  get id() { return this.#_id };
  get title() { return this.#title };
  get salary() { return this.#salary };
  get location() { return this.#location };
  get description() { return this.#description };
  get experience() { return this.#experience };
  get skills() { return this.#skills };
  get postDate() { return this.#postDate };

  set title(title: string) { this.#title = title };
  set salary(salary: number) { this.#salary = salary };
  set location(location: Location) { this.#location = location };
  set description(description: string) { this.#description = description };
  set experience(experience: string) { this.#experience = experience };
  set skills(skills: string[]) { this.#skills = skills };
  set postDate(postDate: Date) { this.#postDate = postDate };



  constructor(id: string, title: string, salary: number, location: Location, description: string, experience: string, skills: string[], postDate: Date) {
    this.#_id = id;
    this.#title = title;
    this.#salary = salary;
    this.#location = location;
    this.#description = description;
    this.#experience = experience;
    this.#skills = skills;
    this.#postDate = postDate;
  }
}
