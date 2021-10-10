import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  apiUrl: string = 'https://crudcrud.com/api/f6aaab4eb35d489995dd386f294b1e1d/recipe';


  constructor(
    private httpClient: HttpClient,
    // @Inject('https://crudcrud.com/api/9645eda4d9234eeca1349d099cc3390b/recipe.json') private apiUrl: string
  ) {
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.apiUrl}`, {
      params: new HttpParams().set('X-API-KEY', 'HoA')
    });
  }

  getRecipe(recipeId: string) {
    return this.httpClient.get<Recipe>(`${this.apiUrl}/${recipeId}`, {
      params: new HttpParams().set('X-API-KEY', 'HoA')
    }
    );
  }

  createRecipe(recipe: Recipe) {
    return this.httpClient.post<Recipe>(`${this.apiUrl}`, recipe, {
      params: new HttpParams().set('X-API-KEY', 'HoA')
    });
  }


  updateRecipe(updatedRecipe: Recipe) {
    return this.httpClient.put<Recipe>(`${this.apiUrl}/${updatedRecipe._id}`, updatedRecipe, {
      params: new HttpParams().set('X-API-KEY', 'HoA')
    });
  }

  deleteRecipe(recipeId: string) {
    return this.httpClient.delete<Recipe>(`${this.apiUrl}/${recipeId}`, {
      params: new HttpParams().set('X-API-KEY', 'HoA')
    });
  }
}
