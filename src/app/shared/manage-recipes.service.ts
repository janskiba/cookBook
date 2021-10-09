import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})

export class ManageRecipesService {
  //Subject to add recipe locally
  newRecipe = new Subject<Recipe>();

  //Subject to delete recipe locally
  removeRecipe = new Subject<string>();

  //Subject to share whole array locally
  shareRecipes = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor() { }

  addRecipe(recipe: Recipe) {
    this.newRecipe.next(recipe);
  }

  deleteRecipe(id: string) {
    this.removeRecipe.next(id);
  }

  passRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.shareRecipes.next(this.recipes.slice());
  }
}
