import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  url: string = 'https://crudcrud.com/api/87127f7e920544b9982c917f95876859/recipe';

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
