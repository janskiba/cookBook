import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from 'src/app/shared/recipe.model';
import { ManageRecipesService } from 'src/app/shared/manage-recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {

  @Input() recipe?: Recipe;

  constructor(
    private manageRecipesService: ManageRecipesService,
    private router: Router) { }

  deleteRecipe(id: string) {
    this.manageRecipesService.deleteRecipe(id);
  }

  editRecipe(recipeId: string) {
    this.manageRecipesService.navigateToEdit(recipeId);
  }

  showRecipe(recipeId: string) {
    this.router.navigate(['/recipe', { id: recipeId }]);
  }
}
