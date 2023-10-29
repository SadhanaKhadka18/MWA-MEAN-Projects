import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksDataService } from '../books-data.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Book } from '../book.service';
import { Author } from '../authors.service';
import { Location } from '../location.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBookForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _bookDataService: BooksDataService, private _route: ActivatedRoute, private _router: Router) { }
  ngOnInit(): void {
    this.addBookForm = this._formBuilder.group({
      title: [''],
      noOfPages: [''],
      year: [''],
      publisherName: [''],
      authorName: [''],
      authorDescription: [''],
      authorLongitude: [''],
      authorLatitude: ['']
    })

  }
  onAddBookFormSubmit(): void {
    const bookID = this._route.snapshot.params["bookId"];
    if (this.addBookForm) {
      const bookFromForm = this.addBookForm.value;
      console.log(bookFromForm);

      const newBook = new Book("", bookFromForm.title, bookFromForm.year, bookFromForm.publisherName, bookFromForm.noOfPages, [new Author("", bookFromForm.authorName, bookFromForm.authorDescription, new Location([bookFromForm.authorLongitude, bookFromForm.authorLatitude]))]);
      this._bookDataService.addBook(newBook).subscribe({
        next: (addedBook) => {
          // console.log(book);
          this._router.navigate(['/book/' + addedBook._id])
        },
        error: () => { }
      })

    }
  }
}
