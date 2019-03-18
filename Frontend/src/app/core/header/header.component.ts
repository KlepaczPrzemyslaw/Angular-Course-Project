import { AuthService } from './../../auth/auth.service';
import { HttpService } from './../../shared/http.service';
import { Component } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private httpSerice: HttpService, private authService: AuthService) { }

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
