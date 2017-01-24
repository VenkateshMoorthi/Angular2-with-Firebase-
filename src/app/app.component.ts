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
  exists;
  constructor(private af: AngularFire){ 
  }
 
  ngOnInit() {
    this.cuisines = this.af.database.list('/cuisines',{
      query:{
        orderByValue:true,
        equalTo:"Italian"
      }
    });


    this.restaurants = this.af.database.list('/restaurants',{
      query:{
        orderByChild:'rating',
        equalTo: 5
      }
    });

    this.af.database.list('/restaurants').push({ name:''})
    .then(x=>{
      let restaurant = { name :" My New Restaurant"};

      let update={};
      update['restaurants/' + x.key] = { name:'My New Restaurant'};
      update['restaurants-by-city/camberwell/' + x.key] = restaurant;

      this.af.database.object('/').update(update);
    })
    

  }
}
