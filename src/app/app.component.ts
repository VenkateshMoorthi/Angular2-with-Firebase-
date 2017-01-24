import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   error;

  constructor(private af: AngularFire, private http:Http){ 
  }
 
  ngOnInit() {
    this.af.auth.subscribe(authState=>{
    });
  }

  register(){
    this.af.auth.createUser({
      email:"venkateshmoorthi11@gmail.com",
      password:"Martial@8"
    }).then(authState=>{
      authState.auth.sendEmailVerification();
    }).catch(error=>{
      console.log("Register-error",error);
    });
  }

  login(){
    this.af.auth.login({
      email:'venkateshmoorthi11@gmail.com',
      password:'Martial8'
    },{
      method:AuthMethods.Password,
      provider:AuthProviders.Password
    })
    .then(authState=>{
      console.log("Login-then")
    }).catch(error=>{
      this.error=error;
    });
  }

  logout(){
    this.af.auth.logout();
  }
}
