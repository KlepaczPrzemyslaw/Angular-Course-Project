import { AuthService } from './../../auth/auth.service';
import { HttpService } from './../../shared/http.service';
import { Component } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private httpSerice: HttpService, private authService: AuthService) { }

  onSaveData() {
    this.httpSerice.storeRecipes()
    .subscribe((response: Response) => {
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
