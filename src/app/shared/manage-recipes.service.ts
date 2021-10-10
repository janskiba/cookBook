import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmationDialogComponent } from '../recipes/confirmation-dialog/confirmation-dialog.component';
import { InfoDialogComponent } from '../recipes/info-dialog/info-dialog.component';
import { DataStorageService } from './data-storage.service';
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

  constructor(
    private dialog: MatDialog,
    private dataStorageService: DataStorageService,
    private router: Router) { }

  addRecipe(recipe: Recipe) {
    this.newRecipe.next(recipe);
  }


  deleteRecipe(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      id: id
    });

    dialogRef.afterClosed().subscribe(result => {

      //if delete is accepted
      if (result) {
        this.dataStorageService.deleteRecipe(id).subscribe(res => {
          this.removeRecipe.next(id);
          this.dialog.open(InfoDialogComponent, {
            data: {
              succes: true,
              action: 'deleted'
            }
          });

          this.router.navigate(['/add-recipe']);
        }, err => {
          this.dialog.open(InfoDialogComponent, {
            data: {
              succes: false,
              errorMessage: err.message,
              action: 'deleting'
            }
          });
        });
      }
      else { return; }
    });
  }

  navigateToEdit(recipeId: string) {
    this.router.navigate(['/edit-recipe', { id: recipeId }]);
  }

  updateRecipe(recipe: Recipe) {
    this.dataStorageService.updateRecipe(recipe).subscribe(res => {
      this.dialog.open(InfoDialogComponent, {
        data: {
          succes: true,
          action: 'updated'
        }
      });
    }, err => {
      this.dialog.open(InfoDialogComponent, {
        data: {
          succes: false,
          errorMessage: err.message,
          action: 'updating'
        }
      });
    });
  }

}
