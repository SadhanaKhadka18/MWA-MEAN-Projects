import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { User } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm', { static: true }) loginForm!: NgForm;
  loginData = {
    name: '',
    username: '',
    password: ''
  }
  constructor(private _userDataService: UserDataService, private _authenticationService: AuthenticationService,private _router:Router) { }

  submitLoginForm(): void {

    const loginDataFromForm = this.loginForm.value;
    const loginUser: User = new User("", loginDataFromForm.username, loginDataFromForm.password);
    this._userDataService.loginUser(loginUser).subscribe({
      next: () => {
        this._authenticationService.setLoggedIn(loginUser.username, loginUser.password);
        this.loginForm.reset();
        this._router.navigate(['/profile/'+loginUser.username]);
       
      },
      error: () => {
        console.log("login failed");
        this.loginForm.reset();
      }
    })
  }
  isLoggedIn(): Boolean {
    return this._authenticationService.getLoggedIn();
  }


}
