import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable()
export class AuthService {
  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  signupUser(email: string, password: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      (response) => {
        this.store.dispatch(new AuthActions.Signup());
        this.router.navigate(['/']);
      }
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
        this.store.dispatch(new AuthActions.Signin());
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then((recToken: string) => {
          this.store.dispatch(new AuthActions.SetToken(recToken));
        });
      }
    ).catch(
      (error) => { console.log(error); }
    );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
}
