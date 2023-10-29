import { Component, OnInit } from '@angular/core';
import { Book } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksDataService } from '../books-data.service';
import { Author } from '../authors.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Book;
  authors: Author[] = [];

  constructor(private _router: Router, private _route: ActivatedRoute, private _BookDataService: BooksDataService,
    private _authenticationService:AuthenticationService) {
    this.book = new Book("", "", "", "", 0, []);
  }
  ngOnInit(): void {
    const bookId = this._route.snapshot.params["bookId"];

    this._BookDataService.getBook(bookId).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (err) => {
        console.log("error getting  book");
      }
    })
  }

  onDeleteBook(): void {
    const bookId = this._route.snapshot.params["bookId"];
    this._BookDataService.deleteBook(bookId).subscribe({
      next: (deletedBook) => {
        console.log(deletedBook);
        this._router.navigate(['/books'])
      },
      error: () => {
        console.log("error in deleting book");
      }
    })
  }
  isLoggedIn(): Boolean {
    return this._authenticationService.getLoggedIn();
  }

}
