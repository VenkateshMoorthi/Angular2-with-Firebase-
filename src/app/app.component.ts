import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';


import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   displayName;
   displayURL;

  constructor(private af: AngularFire){ 
  }
 
  ngOnInit() {
    this.af.auth.subscribe(authState=>{
      if(!authState){
        this.displayName=null;
        this.displayURL=null;
        return;
      }
      this.displayName=authState.auth.displayName;
      this.displayURL=authState.auth.photoURL
    })
  }

  login(){
    this.af.auth.login({
      provider:AuthProviders.Facebook,
      method:AuthMethods.Popup
    }).then(authState=>{
      console.log("Afetr login", authState);
    });
  }

  logout(){
    this.af.auth.logout();
  }
}
