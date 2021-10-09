import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private dataStorageService: DataStorageService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataStorageService.getRecipes().subscribe(res => {
      this.recipes = res;
      this.changeDetectorRef.detectChanges();
    }, err => {
      setTimeout(() => {
        alert("Error occured during fetching recipes. Error message: " + err.message);
      }, 1000);
    });
  }
}
