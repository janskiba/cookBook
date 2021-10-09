import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeComponent implements OnInit {

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
    ingredientName: new FormControl('', [
      Validators.required,
    ]),
    ingredientQuantity: new FormControl('', [
      Validators.required,
    ])
  });

  ingredientsArray: Ingredient[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  resetForm() {
    this.addRecipeForm.reset();
  }

  addIngredient(name: string, quantity: string) {
    const ingredient: Ingredient = {
      name: name,
      quantity: quantity
    };

    this.ingredientsArray.push(ingredient);

    this.addRecipeForm.get("ingredientName")?.reset();
    this.addRecipeForm.get("ingredientQuantity")?.reset();
  }

}
