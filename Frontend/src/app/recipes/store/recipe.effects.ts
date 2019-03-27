import { HttpClient, HttpRequest } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipes from '../store/recipe.reducers';
import { Store } from '@ngrx/Store';

export class RecipeEffects {
  constructor(private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipes.FeatureState>) {}

  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => {
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
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    })
  );

  @Effect({dispatch: false})
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const request = new HttpRequest(
        'PUT',
        'https://ng-recipe-book-api.firebaseio.com/recipes.json',
        state.recipes,
        { reportProgress: true });
      return this.httpClient.request(request);
    }),
  );
}
