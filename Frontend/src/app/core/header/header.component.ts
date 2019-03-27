import { Component, OnInit } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private httpSerice: HttpService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
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
    this.store.dispatch(new AuthActions.Logout() );
  }
}
