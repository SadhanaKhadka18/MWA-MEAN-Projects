import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import {HttpClientModule} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { JobOpeningsComponent } from './job-openings/job-openings.component';
import { JobOpeningComponent } from './job-opening/job-opening.component';
import { AddJobOPeningComponent } from './add-job-opening/add-job-opening.component';
import { UpdateJobOpeningComponent } from './update-job-opening/update-job-opening.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    JobOpeningsComponent,
    JobOpeningComponent,
    AddJobOPeningComponent,
    UpdateJobOpeningComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "home",
        component: HomeComponent
      },{
        path: "jobOpenings",
        component: JobOpeningsComponent
      }
      ,{
        path: "jobOpening/:jobId",
        component: JobOpeningComponent
      }
      ,{
        path: "updateJobOpening/:jobId",
        component: UpdateJobOpeningComponent
      }
      ,{
        path:"addJobOpening",
        component: AddJobOPeningComponent
      }
      ,{
        path:"test",
        component: TestComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
