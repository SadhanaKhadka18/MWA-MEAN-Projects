import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorDataService {
  baseUrl = "http://localhost:3300/api/"
  constructor(private _http: HttpClient) { }

  public getAuthor(bookId: string, authorId: string): Observable<Author> {
    const url = this.baseUrl + "books/" + bookId + "/authors/" + authorId;
    return this._http.get<Author>(url);
  }
  public addAuthor(bookId: string, newAuthor: Author): Observable<Author> {
    const url = this.baseUrl + "books/" + bookId + "/authors/";
    console.log(newAuthor);
    
    const authorToAdd = { "authors": [{ "name": newAuthor.name, "description": newAuthor.description, "location": { coordinates: [newAuthor.location.coordinates[0], newAuthor.location.coordinates[1]] } }] }
    // console.log(authorToAdd);
    
    return this._http.post<Author>(url, authorToAdd);

  }
  public deleteAuthor(bookId: string, authorId: string): Observable<Author> {
    const url = this.baseUrl + "books/" + bookId + "/authors/" + authorId;
    return this._http.delete<Author>(url);
  }
  public updateAuthor(bookId: string, authorId: string, updatedAuthor: Author): Observable<Author> {
    const authorToUpdate = { "name": updatedAuthor.name, "description": updatedAuthor.description, "location": { coordinates: [updatedAuthor.location.coordinates[0], updatedAuthor.location.coordinates[1]] } }
    const url = this.baseUrl + "books/" + bookId + "/authors/" + authorId;
    return this._http.patch<Author>(url, authorToUpdate);
  }
}
