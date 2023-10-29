import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class BooksDataService {
  baseUrl = "http://localhost:3300/api/"

  constructor(private _http: HttpClient) { }

  public getBooks(offset: number): Observable<Book[]> {
    const url = this.baseUrl + "books?count=5&offset=" + offset;
    return this._http.get<Book[]>(url);
  }

  public getBook(bookId: string): Observable<Book> {
    const url = this.baseUrl + "books/" + bookId;
    return this._http.get<Book>(url);
  }

  public deleteBook(bookId: string): Observable<Book> {
    const url = this.baseUrl + "books/" + bookId;
    return this._http.delete<Book>(url);
  }

  public addBook(newBook: Book): Observable<Book> {
    const url = this.baseUrl + "books/";
    console.log(newBook);
    const newBooktoAdd = {
      "title": newBook.title, "year": newBook.year,
      "publisherName": newBook.publisherName, "noOfPages": newBook.noOfPages, "authors":
        [{
          "name": newBook.authors[0].name, "description": newBook.authors[0].description
          , "location": { coordinates: [newBook.authors[0].location.coordinates[0], newBook.authors[0].location.coordinates[1]] }
        }]
    }

    return this._http.post<Book>(url, newBooktoAdd);
  }

  public updateBook(bookId: string, updatedBook: Book): Observable<Book> {
    const newBooktoUpdate = {
      "title": updatedBook.title, "year": updatedBook.year,
      "publisherName": updatedBook.publisherName, "noOfPages": updatedBook.noOfPages
    }
    const url = this.baseUrl + "books/" + bookId;
    return this._http.patch<Book>(url, newBooktoUpdate);
  }

}
