import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})
export class StarsRatingComponent implements OnChanges{
 
  _rating: number = 0;
  stars: number[] = [];
  @Input()
  set rating(rating: number) {
    console.log(rating);
    this._rating = rating;
    this.stars = new Array<number>(rating);
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.stars=new Array<number>(changes['rating'].currentValue)
  }

}
