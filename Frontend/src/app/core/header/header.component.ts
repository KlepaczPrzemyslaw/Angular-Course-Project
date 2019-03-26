import { AuthService } from './../../auth/auth.service';
import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private httpSerice: HttpService,
    private authService: AuthService,
    private store: Store) { }

  ngOnInit(): void {
    this.authState = this.store.select('auth')
    .subscribe;
  }

  onSaveData() {
    this.httpSerice.storeRecipes()
    .subscribe((response: HttpEvent<Object>) => {
      console.log(response);
    });
  }

  fetchData() {
    this.httpSerice.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuth() {
    return this.authService.isAuth();
  }
}
