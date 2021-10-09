import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ManageRecipesService } from 'src/app/shared/manage-recipes.service';
import { Recipe } from 'src/app/shared/recipe.model';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  fetching: boolean = true;
  public query: string = '';
  focused: boolean = false;

  constructor(private dataStorageService: DataStorageService,
    private changeDetectorRef: ChangeDetectorRef,
    private manageRecipesService: ManageRecipesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetching = true;

    this.dataStorageService.getRecipes().subscribe(res => {
      this.recipes = res.reverse();
      this.fetching = false;
      //share array to filter-recipes component
      this.manageRecipesService.passRecipes(this.recipes);
      this.changeDetectorRef.detectChanges();
    }, err => {
      this.dialog.open(InfoDialogComponent, {
        data: {
          succes: false,
          errorMessage: err.message,
          action: 'fetching',
        }
      });
    });

    this.manageRecipesService.newRecipe.subscribe(res => {
      this.recipes.unshift(res);

      //share updated array to filter-recipes component
      this.manageRecipesService.passRecipes(this.recipes);
      this.changeDetectorRef.detectChanges();
    });

    this.manageRecipesService.removeRecipe.subscribe(res => {
      this.deleteRecipe(res);
    });
  }

  deleteRecipe(id: string) {
    this.recipes.forEach((element, index) => {
      if (element._id === id) this.recipes.splice(index, 1);
      this.changeDetectorRef.detectChanges();
    });
  }
}
