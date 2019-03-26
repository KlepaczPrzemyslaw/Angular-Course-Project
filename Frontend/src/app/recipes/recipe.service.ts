import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

export class RecipeService {
  recipesChanges = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanges.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanges.next(this.recipes.slice());
  }
}
