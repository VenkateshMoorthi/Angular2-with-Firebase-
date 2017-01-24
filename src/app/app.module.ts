import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';

export const firebaseConfig = {
    apiKey: "AIzaSyBKjtqgSyaMWMn1ZJbq9vt2eSYrPPSgGcM",
    authDomain: "pepper-48abb.firebaseapp.com",
    databaseURL: "https://pepper-48abb.firebaseio.com",
    storageBucket: "pepper-48abb.appspot.com",
    messagingSenderId: "1085941269377"
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
