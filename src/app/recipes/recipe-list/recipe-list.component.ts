import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ManageRecipesService } from 'src/app/shared/manage-recipes.service';
import { Recipe } from 'src/app/shared/recipe.model';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  fetching: boolean = true;
  public query: string = '';

  addSubscription!: Subscription;
  deleteSubscription!: Subscription;

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

    this.addSubscription = this.manageRecipesService.newRecipe.subscribe(res => {
      this.recipes.unshift(res);
      this.changeDetectorRef.detectChanges();
    });

    this.deleteSubscription = this.manageRecipesService.removeRecipe.subscribe(res => {
      this.deleteRecipe(res);
    });
  }

  ngOnDestroy() {
    this.addSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

  deleteRecipe(id: string) {
    this.recipes.forEach((element, index) => {
      if (element._id === id) this.recipes.splice(index, 1);
      this.changeDetectorRef.detectChanges();
    });
  }
}
