import { Component, OnInit } from '@angular/core';

import { JobOpening } from '../job-opening.service';
import { JobOpeningDataService } from '../job-opening-data.service';

@Component({
  selector: 'app-job-openings',
  templateUrl: './job-openings.component.html',
  styleUrls: ['./job-openings.component.css']
})
export class JobOpeningsComponent implements OnInit {

  jobOpenings: JobOpening[] = [];
  selectedOptions: string[] = [];


  constructor(private _jobOpeningDataService: JobOpeningDataService) { }

  ngOnInit(): void {
    this._jobOpeningDataService.getJobOpenings().subscribe({
      next: (foundJobOpenings: any[]) => {
        this.jobOpenings = foundJobOpenings.map((jobOpening) => {
          return new JobOpening(jobOpening._id, jobOpening.title, jobOpening.salary, jobOpening.location, jobOpening.description, jobOpening.experience, jobOpening.skills, jobOpening.postDate);
        })
      },
      error: (err) => {
        console.log("error in getting job Openings");

      }
    })
  }
  sortJobs():void{
    this.jobOpenings.sort((a, b) => a.title.localeCompare(b.title));
  }
  select():void{
    console.log(this.selectedOptions);
    
  }
}
