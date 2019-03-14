import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes(): Observable<any> {
    let token = this.authService.getIdToken();
    return this.http.put('https://ng-recipe-book-api.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes(): void {
    let token = this.authService.getIdToken();
    this.http.get('https://ng-recipe-book-api.firebaseio.com/recipes.json?auth=' + token)
    .pipe(map( (response: Response) => {
      let recipes: Recipe[] = response.json();

      if(recipes === null) {
        recipes = [];
        return recipes;
      }

      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return recipes;
    }))
    .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
    });
  }
}
