import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import * as RecpieActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';

export class RecipeEffects {
  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecpieActions.FETCH_RECIPES),
    switchMap((action: RecpieActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-api.firebaseio.com/recipes.json?', {
        observe: 'body',
        responseType: 'json'
      });
    }),
    map((recipes: Recipe[]) => {
      if(recipes === null) {
        recipes = [];
        return recipes;
      }

      for (let singleRecipe of recipes) {
        if (!singleRecipe['ingredients']) {
          singleRecipe['ingredients'] = [];
        }
      }
      return {
        type: RecpieActions.SET_RECIPES,
        payload: recipes
      };
    })
  );
}
