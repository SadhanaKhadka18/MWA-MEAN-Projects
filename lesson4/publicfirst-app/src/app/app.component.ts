import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sadhana\'s first-app';
  people:string[]=["Jack","Jill","John"]

  onClickBtn(){
    this.title="Button Clicked"
  }

  today=new Date();
}
