import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { AuthorComponent } from './author/author.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { UpdateAuthorComponent } from './update-author/update-author.component';
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    BooksComponent,
    BookComponent,
    AuthorComponent,
    AddAuthorComponent,
    UpdateAuthorComponent,
    AddBookComponent,
    UpdateBookComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent

      }, {
        path: "books",
        component: BooksComponent
      },
      {
        path: "book/:bookId",
        component: BookComponent
      },
      {
        path: "book/:bookId/author/:authorId",
        component: AuthorComponent
      },
      {
        path: "book/:bookId/AddAuthor",
        component: AddAuthorComponent
      },
      {
        path: "book/:bookId/UpdateAuthor/:authorId",
        component: UpdateAuthorComponent
      }, {
        path: "addBook",
        component: AddBookComponent
      }, {
        path: "updateBook/:bookId",
        component: UpdateBookComponent
      }, {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "profile/:username",
        component: ProfileComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
