import { Component, OnInit } from '@angular/core';

import { Book } from '../book.service';
import { BooksDataService } from '../books-data.service';
import { Author } from '../authors.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  offset = 0;
  count = 5;
  books: Book[] = [];
  constructor(private _bookDataService: BooksDataService, private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadBooks();
  }
  loadBooks(): void {
    this._bookDataService.getBooks(this.offset).subscribe({
      next: (books: Book[]) => {
        this.books = books;
      },
      error: (err) => {
        console.log("error in getting Books");
      }
    });
  }

  previousPage(): void {
    if (this.offset - this.count >= 0) {
      this.offset -= this.count;
      this.loadBooks();
    }

  }
  nextPage(): void {

    if (this.books.length === this.count) {
      this.offset += this.count;
      this.loadBooks();
    }

  }
  isPreviousDisabled(): Boolean {
    return this.offset === 0;
  }
  isNextDisabled(): Boolean {
    return this.books.length < this.count;
  }

  sortBooks() {
    this.books.sort((book1, book2) => book1.title.localeCompare(book2.title));
  }
  isLoggedIn(): Boolean {
    return this._authenticationService.getLoggedIn();
  }
}
