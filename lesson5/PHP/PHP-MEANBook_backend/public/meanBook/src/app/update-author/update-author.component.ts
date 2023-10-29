import { Component, OnInit } from '@angular/core';
import { AuthorDataService } from '../author-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../authors.service';
import { Location } from '../location.service';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.css']
})
export class UpdateAuthorComponent implements OnInit {
  updateAuthorData = {
    name: "",
    description: "",
    latitude: 0,
    longitude: 0
  };
  constructor(private _authorDataService: AuthorDataService, private _route: ActivatedRoute, private _router: Router) {

  }
  ngOnInit(): void {
    const bookId = this._route.snapshot.params['bookId'];
    const authorId = this._route.snapshot.params['authorId'];

    this._authorDataService.getAuthor(bookId, authorId).subscribe({
      next: (author) => {
        this.updateAuthorData.name = author.name;
        this.updateAuthorData.description = author.description;
        this.updateAuthorData.latitude = author.location.coordinates[1];
        this.updateAuthorData.longitude = author.location.coordinates[0];
      }
    })
  }

  submitUpdateAuthorForm(): void {
    const bookId = this._route.snapshot.params['bookId'];
    const authorId = this._route.snapshot.params['authorId'];
    if (this.updateAuthorData) {
      const updatedAuthorfromForm = this.updateAuthorData;
      const updatedAuthor: Author = new Author("", updatedAuthorfromForm.name, updatedAuthorfromForm.description, new Location([updatedAuthorfromForm.longitude, updatedAuthorfromForm.latitude]));
      this._authorDataService.updateAuthor(bookId, authorId, updatedAuthor).subscribe({
        next: (updatedAuthor) => {
          this._router.navigate(['/book/' + bookId + '/author/' + authorId]);
        }, error: () => {
          console.log("error in updating Author");

        }
      })

    }

  }


}
