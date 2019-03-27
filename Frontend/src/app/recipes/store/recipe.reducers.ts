import * as fromApp from './../../store/app.reducer';
import { Recipe } from './../recipe.model';

import * as RecipeActions from './recipe.actions';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Init',
      'Init-Desc',
      'http://www.bluewillowtucson.com/wp-content/themes/blue-willow/images/shrimp-0794.jpg',
      []
    )
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const oldRecipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...oldRecipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case RecipeActions.DELETE_RECIPE:
      const recipesArray = [...state.recipes];
      recipesArray.splice(action.payload, 1);
      return {
        ...state,
        recipes: recipesArray
      };
    default:
      return state;
  }
}
