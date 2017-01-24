import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   displayName;
   displayURL;

  constructor(private af: AngularFire, private http:Http){ 
  }
 
  ngOnInit() {
    this.af.auth.subscribe(authState=>{
      if(!authState){
        this.displayName=null;
        this.displayURL=null;
        return;
      }

      let userRef = this.af.database.object('/users/' + authState.uid);
      userRef.subscribe(user=>{
          let url = `https://graph.facebook.com/v2.8/${authState.facebook.uid}?fields=first_name,last_name&access_token=${user.accessToken}`;
          this.http.get(url).subscribe(response=>{
            let user = response.json();
            userRef.update({
              firstName:user.first_name,
              lastName:user.last_name
            });
          });
      });

      this.displayName=authState.auth.displayName;
      this.displayURL=authState.auth.photoURL
    })
  }

  login(){
    this.af.auth.login({
      provider:AuthProviders.Facebook,
      method:AuthMethods.Popup,
      scope:['user_birthday','user_friends']
    }).then((authState: any)=>{
      this.af.database.object('/users/' + authState.uid).update({
        accessToken:authState.facebook.accessToken
      })
    });
  }

  logout(){
    this.af.auth.logout();
  }
}
