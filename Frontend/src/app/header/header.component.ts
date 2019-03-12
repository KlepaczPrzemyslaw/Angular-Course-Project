import { HttpService } from './../shared/http.service';
import { Component } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private httpSerice: HttpService) { }

  onSaveData() {
    this.httpSerice.storeRecipes()
    .subscribe((response: Response) => {
      console.log(response);
    });
  }

  fetchData() {
    this.httpSerice.getRecipes();
  }
}
