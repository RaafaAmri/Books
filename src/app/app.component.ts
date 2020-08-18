import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 constructor(){
  var firebaseConfig = {
    apiKey: "AIzaSyCkUjpZuC8ZvSUHa1b350-GxThK_f3-g4A",
    authDomain: "books-db868.firebaseapp.com",
    databaseURL: "https://books-db868.firebaseio.com",
    projectId: "books-db868",
    storageBucket: "books-db868.appspot.com",
    messagingSenderId: "1064357260939",
    appId: "1:1064357260939:web:3ed3dd43b2aef07ee32e8e",
    measurementId: "G-EXDNW4ECR2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 }
}
