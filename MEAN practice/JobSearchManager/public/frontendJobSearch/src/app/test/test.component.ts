import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent  implements OnInit{
  numberOfMovies=5;
  station={
    selected:""
  }
  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  selectedItems: string[] = [];

  ngOnInit(): void {
   console.log(this.numberOfMovies);
   
   }
   updateNumberOfMovies(value: number) {
    this.numberOfMovies = value;
    console.log( this.numberOfMovies);
    
    // Call a function to fetch and display movies based on the selected value
   
  }
  toggleSelection(item: string) {
    if (this.selectedItems.includes(item)) {
      this.selectedItems = this.selectedItems.filter((x) => x !== item);
    } else {
      this.selectedItems.push(item);
    }
    console.log(this.selectedItems);
    
  }

}
