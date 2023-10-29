import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username!: string;
  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute, private _router: Router) { }
  ngOnInit(): void {
    this.username = this._route.snapshot.params['username'];
  }
  isLoggedIn(): Boolean {
    return this._authenticationService.getLoggedIn();
  }

  
}
