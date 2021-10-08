import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  url: string = 'https://crudcrud.com/api/b5e34c342c304f58891e2faf4bf38a22/recipe/';

  constructor(private httpClient: HttpClient) { }

  getRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.url}`);
  }

  createRecipe(recipe: Recipe) {
    return this.httpClient.post<Recipe>(`${this.url}`, recipe);
  }

  updateRecipe(updatedRecipe: Recipe) {
    return this.httpClient.put<Recipe>(`${this.url}/${updatedRecipe._id}`, updatedRecipe);
  }

  deleteRecipe(recipeId: string) {
    return this.httpClient.delete<Recipe>(`${this.url}/${recipeId}`);
  }
}
