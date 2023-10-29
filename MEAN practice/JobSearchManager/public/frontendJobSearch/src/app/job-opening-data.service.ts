import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobOpening } from './job-opening.service';

@Injectable({
  providedIn: 'root'
})
export class JobOpeningDataService {
  baseUrl = "http://localhost:4000/api/"

  constructor(private _http: HttpClient) { }

  public getJobOpenings(): Observable<any[]> {
    const url = this.baseUrl + "jobOpening";
    return this._http.get<any[]>(url);
  }
  public getJobOpening(jobId: string): Observable<any> {
    const url = this.baseUrl + "jobOpening/" + jobId;
    return this._http.get<any>(url);
  }
  public addJobOpening(newJobOpening: JobOpening): Observable<any> {
    const url = this.baseUrl + "jobOpening/";
    const jobOPeningToAdd = {
      "title": newJobOpening.title, "salary": newJobOpening.salary, "location": {
        "state": newJobOpening.location.state,
        "city": newJobOpening.location.city,
        "zip": newJobOpening.location.zip,
        "street": newJobOpening.location.street
      },
      "description": newJobOpening.description, "experience": newJobOpening.experience, "skills": newJobOpening.skills, "postDate": newJobOpening.postDate
    }
    return this._http.post<any>(url, jobOPeningToAdd);
  }
  public updateJobOpening(jobId: string, updatedJobOpening: JobOpening): Observable<any> {
    const url = this.baseUrl + "jobOpening/" + jobId;
    const jobOPeningToUpdate = {
      "title": updatedJobOpening.title, "salary": updatedJobOpening.salary, "location": {
        "state": updatedJobOpening.location.state,
        "city": updatedJobOpening.location.city,
        "zip": updatedJobOpening.location.zip,
        "street": updatedJobOpening.location.street
      },
      "description": updatedJobOpening.description, "experience": updatedJobOpening.experience, "skills": updatedJobOpening.skills, "postDate": updatedJobOpening.postDate
    }
    console.log(jobOPeningToUpdate);
    
    return this._http.patch<any>(url, jobOPeningToUpdate);
  }
  public deleteJobOpening(jobId: string): Observable<any> {
    const url = this.baseUrl + "jobOpening/" + jobId;
    return this._http.delete<any>(url);
  }
}
