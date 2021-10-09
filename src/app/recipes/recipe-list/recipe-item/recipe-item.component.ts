import { Component, Input, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { MatDialog } from "@angular/material/dialog";

import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Recipe } from 'src/app/shared/recipe.model';
import { ManageRecipesService } from 'src/app/shared/manage-recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe?: Recipe;

  constructor(
    private dataStorageService: DataStorageService,
    private dialog: MatDialog,
    private manageRecipesService: ManageRecipesService) { }

  ngOnInit(): void {
  }

  deleteRecipe(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      id: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataStorageService.deleteRecipe(id).subscribe(res => {
          alert('Recipe deleted');
          this.manageRecipesService.deleteRecipe(id);
        }, err => {
          alert('error occured during deleting. Error message: ' + err.message);
        });
      }
      else { return; }
    });
  }
}
