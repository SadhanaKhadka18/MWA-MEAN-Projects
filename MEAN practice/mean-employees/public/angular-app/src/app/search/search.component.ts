import { Component, OnInit } from '@angular/core';
import { EmployeesDataService } from '../employees-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  employeeSearchData = {
    name: ""
  };
  constructor(private _employeeDataService: EmployeesDataService, private _router: Router) { }

  onSubmitSearchForm(): void {

    if (this.employeeSearchData) {
      const nameToSearch = this.employeeSearchData.name;

      this._router.navigate(['/search-results/' + nameToSearch]);
    }
  }

}
