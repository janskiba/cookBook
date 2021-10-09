import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ManageRecipesService } from 'src/app/shared/manage-recipes.service';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  fetching: boolean = true;

  constructor(private dataStorageService: DataStorageService,
    private changeDetectorRef: ChangeDetectorRef,
    private manageRecipesService: ManageRecipesService
  ) { }

  ngOnInit(): void {
    this.fetching = true;

    this.dataStorageService.getRecipes().subscribe(res => {
      this.recipes = res.reverse();
      this.fetching = false;
      this.changeDetectorRef.detectChanges();
    }, err => {
      setTimeout(() => {
        alert("Error occured during fetching recipes. Error message: " + err.message);
      }, 500);
    });

    this.manageRecipesService.newRecipe.subscribe(res => {
      this.recipes.unshift(res);
      console.log(res);
      this.changeDetectorRef.detectChanges();
    });

    this.manageRecipesService.removeRecipe.subscribe(res => {
      this.deleteRecipe(res);
    });
  }

  deleteRecipe(id: string) {
    console.log(id);
    this.recipes.forEach((element, index) => {
      if (element._id === id) this.recipes.splice(index, 1);
      this.changeDetectorRef.detectChanges();
    });
  }
}
