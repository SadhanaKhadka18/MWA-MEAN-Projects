import { Component, OnInit } from '@angular/core';
import { EmployeesDataService } from '../employees-data.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employees/employees.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  employees: Employee[] = [];
  isEmptyresult=false;
  constructor(private _employeeDataService: EmployeesDataService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const nameToSearch = this._route.snapshot.params['searchName'];
    this._employeeDataService.getEmployeesByName(nameToSearch).subscribe({
      next: (matchingEmployees) => {
       if(matchingEmployees.length===0){
        this.isEmptyresult=true;
       }
        this.employees = matchingEmployees;
        
      },
      error: (err) => {
        console.log("error in finding employees");

      }
    })
  }

}
