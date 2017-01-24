import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';


import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;

  constructor(private af: AngularFire){ 
  }
 
  ngOnInit() {
    this.cuisines = this.af.database.list('/cuisines');
    this.restaurants = this.af.database.list('/restaurants').
      map(restaurants => {
      console.log ("Before Map",restaurants);
      restaurants.map(restaurant=>{
        restaurant.featureTypes=[];
        for(var r in restaurant.features)
          restaurant.featureTypes.push(this.af.database.object('/features/'+ r ))
 
      });
      console.log("After Map",restaurants);
      return restaurants;
    })
  }
}
