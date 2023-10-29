import { Component } from '@angular/core';
import { JobOpeningDataService } from '../job-opening-data.service';
import { JobOpening } from '../job-opening.service';
import { Location } from '../location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job-opening',
  templateUrl: './add-job-opening.component.html',
  styleUrls: ['./add-job-opening.component.css']
})
export class AddJobOPeningComponent {
  addJobOpeningData = {
    title: "",
    salary: 0,
    state: "",
    city: "",
    zip: "",
    street: "",
    description: "",
    experience: "",
    skills: ""


  }
  constructor(private _jobOpeningDataService: JobOpeningDataService, private _router: Router) { }
  SubmitAddJobOpeningForm(): void {
    if (this.addJobOpeningData) {
      const jobOpeningDataFromform = this.addJobOpeningData;
      const newLocation = new Location("", jobOpeningDataFromform.state, jobOpeningDataFromform.city, jobOpeningDataFromform.zip, jobOpeningDataFromform.street);
      const skills = jobOpeningDataFromform.skills.split(',');
      const newJopOpening = new JobOpening("", jobOpeningDataFromform.title, jobOpeningDataFromform.salary, newLocation, jobOpeningDataFromform.description, jobOpeningDataFromform.experience, skills, new Date());

      this._jobOpeningDataService.addJobOpening(newJopOpening).subscribe({
        next: (addedJobOpening) => {
          console.log(addedJobOpening);
          this._router.navigate(['/jobOpenings']);

        },
        error: (() => { })
      })
    }

  }
}
