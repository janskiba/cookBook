import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ManageRecipesService } from 'src/app/shared/manage-recipes.service';
import { Recipe } from 'src/app/shared/recipe.model';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {

  //component state ('add' or 'edit)
  state: string = 'add';

  addRecipeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(80),
    ]),
    preparationTime: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('',
      [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(225),
      ]),
    ingredientName: new FormControl(''),
    ingredientQuantity: new FormControl('')
  });

  ingredientsArray: Ingredient[] = [];
  ingredientEdited: boolean = false;

  //currently edited ingredient id
  id!: string;
  private routeSub!: Subscription;


  constructor(
    private dataStorageService: DataStorageService,
    private changeDetectorRef: ChangeDetectorRef,
    private manageRecipesService: ManageRecipesService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'edit-recipe') {
      this.routeSub = this.route.params.subscribe(params => {
        const id = params['id'];
        this.id = id;
        this.dataStorageService.getRecipe(id).subscribe(res => {
          this.changeForm(res);
          this.state = 'edit';
          this.ingredientsArray = res.ingredients;
          this.changeDetectorRef.detectChanges();
        });
      });
    }
  }


  changeForm(recipe: Recipe) {
    this.addRecipeForm.patchValue({
      name: recipe.name,
      preparationTime: recipe.preparationTime,
      description: recipe.description,
    });
  }

  resetForm() {
    this.ingredientsArray = [];
    this.addRecipeForm.reset();
    this.changeDetectorRef.detectChanges();
    if (this.state === 'edit')
      this.router.navigate(['/add-recipe']);
  }

  addIngredient(name: string, quantity: string) {
    if (!this.ingredientEdited) {
      const ingredient: Ingredient = {
        _id: this.ingredientsArray.length.toString(),
        name: name,
        quantity: quantity,
      };

      this.ingredientsArray.push(ingredient);
    } else {
      const ingredient: Ingredient = {
        _id: this.id,
        name: name,
        quantity: quantity,
      };
      this.updateIngredient(ingredient);
    }

    this.addRecipeForm.get("ingredientName")?.reset();
    this.addRecipeForm.get("ingredientQuantity")?.reset();
  }

  onUpdate(ingredient: Ingredient) {
    this.addRecipeForm.get("ingredientName")?.setValue(ingredient.name);
    this.addRecipeForm.get("ingredientQuantity")?.setValue(ingredient.quantity);
    this.ingredientEdited = true;
    this.id = ingredient._id;
  }

  updateIngredient(ingredient: Ingredient) {
    this.ingredientsArray.forEach((element, index) => {
      if (element._id === ingredient._id)
        this.ingredientsArray[index] = ingredient;
    });
    this.ingredientEdited = false;
  }

  deleteIngredient(id: string) {
    this.ingredientsArray.forEach((element) => {
      if (element._id === id)
        this.ingredientsArray.splice(this.ingredientsArray.indexOf(element), 1);
    });
  }

  saveRecipe(form: FormGroup) {
    const formValue = form.value;

    const recipe: Recipe = {
      name: formValue.name,
      preparationTime: formValue.preparationTime,
      description: formValue.description,
      ingredients: this.ingredientsArray
    };
    this.dataStorageService.createRecipe(recipe).subscribe(res => {
      this.resetForm();
      this.manageRecipesService.addRecipe(res);

      this.dialog.open(InfoDialogComponent, {
        data: {
          succes: true,
          action: 'saved',
        }
      });
    },
      err => {
        this.dialog.open(InfoDialogComponent, {
          data: {
            succes: false,
            errorMessage: err.message,
            action: 'saving'
          }
        });
      },
    );
  }

  updateRecipe(form: FormGroup) {
    const formValue = form.value;

    const recipe: Recipe = {
      _id: this.id,
      name: formValue.name,
      preparationTime: formValue.preparationTime,
      description: formValue.description,
      ingredients: this.ingredientsArray
    };
    this.manageRecipesService.updateRecipe(recipe);
  }
}
