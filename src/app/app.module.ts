import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthorInformationDialogComponent } from './navbar/author-information-dialog/author-information-dialog.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ConfirmationDialogComponent } from './recipes/confirmation-dialog/confirmation-dialog.component';
import { InfoDialogComponent } from './recipes/info-dialog/info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthorInformationDialogComponent,
    RecipesComponent,
    RecipeComponent,
    AddRecipeComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ConfirmationDialogComponent,
    InfoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
