import { Ingredient } from './ingredient.model';

export interface Recipe {
  _id?: string;
  name: string;
  preparationTime: number;
  description: string;
  ingredients: Ingredient[];
}
