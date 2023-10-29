import { Component } from '@angular/core';
 
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private _router:Router){}
  onHome():void{
    this._router.navigate([''])
  }
 onGames():void{
  this._router.navigate(['games'])
 }
}
