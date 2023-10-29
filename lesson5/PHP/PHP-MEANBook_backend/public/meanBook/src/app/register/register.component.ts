import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showSuccessMessage = false;
  showErrorMessage = false;
  @ViewChild('registrationForm', { static: true }) registrationForm!: NgForm;
  registrationData = {
    name: '',
    username: '',
    password: ''
  }
  constructor(private _userDataService: UserDataService) { }

  submitRegistrationForm(): void {

    if (this.registrationForm.valid) {
      const registrationDatafromForm = this.registrationForm.value;
      const userToRegister = new User(registrationDatafromForm.name, registrationDatafromForm.username, registrationDatafromForm.password);
      this._userDataService.registerUser(userToRegister).subscribe({
        next: (response) => {
          console.log("registration successful");
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          this.registrationForm.reset();


        },
        error: () => {
          console.log("user registration failed");
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
          this.registrationForm.reset();
        }
      })
    }
  }

}
