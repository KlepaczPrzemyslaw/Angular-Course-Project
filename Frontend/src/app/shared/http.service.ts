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
              private recipeService: RecipeService) { }

  storeRecipes(): Observable<any> {
    return this.http.put('https://ng-recipe-book-api.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes(): void {
    this.http.get('https://ng-recipe-book-api.firebaseio.com/recipes.json')
    .pipe(map( (response: Response) => {
      let recipes: Recipe[] = response.json();
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
