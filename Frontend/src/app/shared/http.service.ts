import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) { }

  storeRecipes(): Observable<any> {
    const request = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-api.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
        reportProgress: true
      });

    return this.httpClient.request(request);
  }
}
