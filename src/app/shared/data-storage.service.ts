import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  apiUrl: string = 'https://crudcrud.com/api/f8ffae73d0cc42eaa9e7e779aafbce51/recipe';


  constructor(
    private httpClient: HttpClient,
    // @Inject('https://crudcrud.com/api/9645eda4d9234eeca1349d099cc3390b/recipe') private apiUrl: string
  ) {
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.apiUrl}`);
  }

  getRecipe(recipeId: string) {
    return this.httpClient.get<Recipe>(`${this.apiUrl}/${recipeId}`);
  }

  createRecipe(recipe: Recipe) {
    return this.httpClient.post<Recipe>(`${this.apiUrl}`, recipe);
  }

  updateRecipe(updatedRecipe: Recipe) {
    return this.httpClient.put<Recipe>(`${this.apiUrl}/${updatedRecipe._id}`, updatedRecipe);
  }

  deleteRecipe(recipeId: string) {
    return this.httpClient.delete<Recipe>(`${this.apiUrl}/${recipeId}`);
  }
}
