import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})

export class ManageRecipesService {
  //emmiter to add recipe locally
  newRecipe = new Subject<Recipe>();

  //emmiter to delete recipe locally
  removeRecipe = new Subject<string>();

  constructor() { }

  addRecipe(recipe: Recipe) {
    this.newRecipe.next(recipe);
  }

  deleteRecipe(id: string) {
    this.removeRecipe.next(id);
  }
}
