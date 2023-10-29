import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from './employees/employees.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeesDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"

  constructor(private http:HttpClient) { }

  
  public getEmployees(offset :number): Observable<Employee[]> {
    const url: string= this.apiBaseUrl + "/employees?offset="+offset;
    
    return this.http.get<Employee[]>(url);
  }
  public getEmployeesByName(name :string): Observable<Employee[]> {
    const url: string= this.apiBaseUrl + "/employees/name/"+name+"";
    
    return this.http.get<Employee[]>(url);
  }
  public getCity(employeeId: string): Observable<Employee> {
    const url: string= this.apiBaseUrl + "/employees/" + employeeId;
    
    return this.http.get<Employee>(url);
  }
  public encryptPassword(employeeId: string): Observable<Employee> {
    const url: string= this.apiBaseUrl + "/employees/" + employeeId;
    return this.http.patch<Employee>(url,"");
  }

}
