import { Component, OnInit } from '@angular/core';

import { EmployeesDataService } from '../employees-data.service';

export class Employee {
  #_id!: String;
  #id!: Number;
  #name!: String;
  #email!: String;
  #password!: String;
  #about!: String;
  #token!: String;
  #country!: String;
  #location!: String;
  #lng!: Number;
  #lat!: Number;
  #dob!: Date;
  #gender!: Number;
  #userType!: Number;
  #userStatus!: Number;
  #profilePicture!: Number;
  #coverPicture!: Number;
  #enablefollowme!: Boolean;
  #sendmenotifications!: Boolean;
  #sendTextmessages!: Boolean;
  #enabletagging!: Boolean;
  #createdAt!: String;
  #updatedAt!: String;
  #livelng!: Number;
  #livelat!: Number;
  #liveLocation!: String;
  #creditBalance!: Number;
  #myCash!: Number

  get _id() { return this.#_id; }
  set _id(_id: String) { this.#_id = _id; }

  get id() { return this.#id; }
  set id(id: Number) { this.#id = id; }

  get name() { return this.#name; }
  set name(name: String) { this.#name = name; }

  get email() { return this.#email; }
  set email(email: String) { this.#email = email; }

  get password() { return this.#password; }
  set password(password: String) { this.#password = password; }

  get about() { return this.#about; }
  set about(about: String) { this.#about = about; }

  get token() { return this.#token; }
  set token(token: String) { this.#token = token; }

  get country() { return this.#country; }
  set country(country: String) { this.#country = country; }

  get location() { return this.#location; }
  set location(location: String) { this.#location = location; }

  get lng() { return this.#lng; }
  set lng(lng: Number) { this.#lng = lng; }

  get lat() { return this.#lat; }
  set lat(lat: Number) { this.#lat = lat; }

  get dob() { return this.#dob; }
  set dob(dob: Date) { this.#dob = dob; }

  get gender() { return this.#gender; }
  set gender(gender: Number) { this.#gender = gender; }

  get userType() { return this.#userType; }
  set userType(userType: Number) { this.#userType = userType; }

  get userStatus() { return this.#userStatus; }
  set userStatus(userStatus: Number) { this.#userStatus = userStatus; }

  get profilePicture() { return this.#profilePicture; }
  set profilePicture(profilePicture: Number) { this.#profilePicture = profilePicture; }

  get coverPicture() { return this.#coverPicture; }
  set coverPicture(coverPicture: Number) { this.#coverPicture = coverPicture; }

  get enablefollowme() { return this.#enablefollowme; }
  set enablefollowme(enablefollowme: Boolean) { this.#enablefollowme = enablefollowme; }

  get sendmenotifications() { return this.#sendmenotifications; }
  set sendmenotifications(sendmenotifications: Boolean) { this.#sendmenotifications = sendmenotifications; }

  get sendTextmessages() { return this.#sendTextmessages; }
  set sendTextmessages(sendTextmessages: Boolean) { this.#sendTextmessages = sendTextmessages; }

  get enabletagging() { return this.#enabletagging; }
  set enabletagging(enabletagging: Boolean) { this.#enabletagging = enabletagging; }

  get createdAt() { return this.#createdAt; }
  set createdAt(createdAt: String) { this.#createdAt = createdAt; }

  get updatedAt() { return this.#updatedAt; }
  set updatedAt(updatedAt: String) { this.#updatedAt = updatedAt; }

  get livelng() { return this.#livelng; }
  set livelng(livelng: Number) { this.#livelng = livelng; }

  get livelat() { return this.#livelat; }
  set livelat(livelat: Number) { this.#livelat = livelat; }

  get liveLocation() { return this.#liveLocation; }
  set liveLocation(liveLocation: String) { this.#liveLocation = liveLocation; }

  get creditBalance() { return this.#creditBalance; }
  set creditBalance(creditBalance: Number) { this.#creditBalance = creditBalance; }

  get myCash() { return this.#myCash; }
  set myCash(myCash: Number) { this.#myCash = myCash; }

  constructor() {

  }
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  offset = 0;
  count = 5;
  currentPage = 1;

  constructor(private employeeService: EmployeesDataService) { }

  ngOnInit(): void {
    this.loadEmployees();
    // console.log("offset", this.offset);

  }
  loadEmployees(): void {
    console.log("load Employees",this.offset);
    
    this.employeeService.getEmployees(this.offset).subscribe({
      next: (employees) => {
        this.fillEmployees(employees)
        this.isNextDisabled()
      },

      error: (error) => {
        this.employees = [];
        console.log(error);
      },
    });
  }
  private fillEmployees(employees: Employee[]) {
    this.employees = employees;

  }

  nextPage(): void {
    
    if ( this.employees.length===this.count) {
      this.offset += this.count;
      this.loadEmployees();
    }
  }
  previousPage(): void {
    if (this.offset - this.count >= 0) {
      this.offset -= this.count;
      this.loadEmployees();
    }
  }
  isPreviousDisabled(): boolean {
    return this.offset === 0;
  }
  isNextDisabled(): boolean {
    return this.employees.length<this.employees.length;
  }
}
