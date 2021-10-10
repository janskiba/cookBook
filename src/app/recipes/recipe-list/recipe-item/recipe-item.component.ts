import { Component, Input, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';

import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Recipe } from 'src/app/shared/recipe.model';
import { ManageRecipesService } from 'src/app/shared/manage-recipes.service';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe?: Recipe;

  constructor(
    private manageRecipesService: ManageRecipesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  deleteRecipe(id: string) {
    this.manageRecipesService.deleteRecipe(id);
  }

  showRecipe(recipeId: string) {
    this.router.navigate(['/recipe', { id: recipeId }]);
  }
}
