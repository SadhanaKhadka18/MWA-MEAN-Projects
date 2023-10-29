import { Component } from '@angular/core';
import { Author } from '../authors.service';
import { AuthorDataService } from '../author-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../location.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent {
  addAuthorData = {
    name: "",
    description: "",
    latitude:0,
    longitude:0

  }
  constructor(private _authtorDataService: AuthorDataService, private _route: ActivatedRoute, private _router: Router) { }
  submitAddAuthorForm(): void {
    if (this.addAuthorData) {
      const authorFromForm = this.addAuthorData;
      const newAuthor: Author = new Author("", authorFromForm.name, authorFromForm.description,new Location([authorFromForm.longitude,authorFromForm.latitude]));
      const bookId = this._route.snapshot.params["bookId"]
      this._authtorDataService.addAuthor(bookId, newAuthor).subscribe({
        next: (updatedAuthor) => {
          console.log(updatedAuthor);
          this._router.navigate(['/book/' + bookId]);
        },
        error: (err) => {
          console.log("error while updating Author");

        }
      }
      )


    }


  }
}
