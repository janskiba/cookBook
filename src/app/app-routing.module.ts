import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: '', component: RecipesComponent,
    children: [
      { path: 'add-recipe', component: AddRecipeComponent },
      { path: 'recipe', component: RecipeComponent },
      { path: 'edit-recipe', component: AddRecipeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
