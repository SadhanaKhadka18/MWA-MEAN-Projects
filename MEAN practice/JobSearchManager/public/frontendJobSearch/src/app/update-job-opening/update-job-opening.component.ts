import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOpeningDataService } from '../job-opening-data.service';
import { Location } from '../location.service';
import { JobOpening } from '../job-opening.service';

@Component({
  selector: 'app-update-job-opening',
  templateUrl: './update-job-opening.component.html',
  styleUrls: ['./update-job-opening.component.css']
})
export class UpdateJobOpeningComponent implements OnInit {

  updateJobOpeningForm!: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _route: ActivatedRoute, private _router: Router
    , private _jobOpeningDataService: JobOpeningDataService) { }

  ngOnInit(): void {
    const jobId = this._route.snapshot.params['jobId'];
    this._jobOpeningDataService.getJobOpening(jobId).subscribe({
      next: (foundJob) => {
        this.updateJobOpeningForm = this._formBuilder.group({
          title: [foundJob.title],
          salary: [foundJob.salary],
          state: [foundJob.location.state],
          city: [foundJob.location.city],
          zip: [foundJob.location.zip],
          street: [foundJob.location.street],
          description: [foundJob.description],
          experience: [foundJob.experience],
          skills: [foundJob.skills]

        })
      }
    })
    this.updateJobOpeningForm = this._formBuilder.group({
      title: [''],
      salary: [''],
      state: [''],
      city: [''],
      zip: [''],
      street: [''],
      description: [''],
      experience: [''],
      skills: ['']

    })

  }


  SubmitUpdateJobOpeningForm(): void {
    const jobId = this._route.snapshot.params['jobId'];
    if (this.updateJobOpeningForm) {
      const jobOpeningDataFromform = this.updateJobOpeningForm.value;
      const newLocation = new Location("", jobOpeningDataFromform.state, jobOpeningDataFromform.city, jobOpeningDataFromform.zip, jobOpeningDataFromform.street);
      const skills = jobOpeningDataFromform.skills;
      const newJopOpening = new JobOpening("", jobOpeningDataFromform.title, jobOpeningDataFromform.salary, newLocation, jobOpeningDataFromform.description, jobOpeningDataFromform.experience, skills, new Date());

      this._jobOpeningDataService.updateJobOpening(jobId, newJopOpening).subscribe({
        next: (addedJobOpening) => {
          console.log(addedJobOpening);
          this._router.navigate(['/jobOpening/' + jobId]);

        },
        error: (() => { })
      })
    }
  }
}
