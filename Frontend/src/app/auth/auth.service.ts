import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signupUser(email: string, password: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      (response) => { this.router.navigate(['/']); }
    )
    .catch(
      (error) => {
        console.log(error);
    });
  }

  signinUser(email: string, password: string): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      (response) => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then((recToken: string) => { this.token = recToken; });
      }
    ).catch(
      (error) => { console.log(error); }
    );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getIdToken(): string {
    firebase.auth().currentUser.getIdToken().then((recToken: string) => { this.token = recToken; });
    return this.token;
  }

  isAuth(): boolean {
    return this.token != null;
  }
}
