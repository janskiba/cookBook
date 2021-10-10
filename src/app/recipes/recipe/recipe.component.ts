import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ManageRecipesService } from 'src/app/shared/manage-recipes.service';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit, OnDestroy {

  recipe!: Recipe;
  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private changeDetectorRef: ChangeDetectorRef,
    private manageRecipesService: ManageRecipesService) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.dataStorageService.getRecipe(id).subscribe(res => {
        this.recipe = res;
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  delete(recipeId: string) {
    this.manageRecipesService.deleteRecipe(recipeId);
  }

}
