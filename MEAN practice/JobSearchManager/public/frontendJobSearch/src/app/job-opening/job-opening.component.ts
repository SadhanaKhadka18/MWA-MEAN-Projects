import { Component, OnInit } from '@angular/core';
import { JobOpening } from '../job-opening.service';
import { JobOpeningDataService } from '../job-opening-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-opening',
  templateUrl: './job-opening.component.html',
  styleUrls: ['./job-opening.component.css']
})
export class JobOpeningComponent implements OnInit {

  jobOpening !: JobOpening;

  constructor(private _jobOpeningDataService: JobOpeningDataService, private _route: ActivatedRoute,private _router:Router) { }


  ngOnInit(): void {
    const jobId = this._route.snapshot.params['jobId'];
    this._jobOpeningDataService.getJobOpening(jobId).subscribe({
      next: (foundJobOpening) => {
        this.jobOpening = new JobOpening(foundJobOpening._id, foundJobOpening.title, foundJobOpening.salary, foundJobOpening.location, foundJobOpening.description, foundJobOpening.experience, foundJobOpening.skills, foundJobOpening.postDate);
      },
      error: () => {
        console.log("job not found");

      }
    });


  }

  onDeleteJob(): void {
    const jobId = this._route.snapshot.params['jobId'];
    this._jobOpeningDataService.deleteJobOpening(jobId).subscribe({
      next: (deletedJobOpening) => {
       this._router.navigate(['/jobOpenings'])
      },
      error: () => {
        console.log("job not found");

      }
    });

  }


}
