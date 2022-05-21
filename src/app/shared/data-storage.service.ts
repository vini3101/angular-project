import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storageRecipes() {
    this.http
      .put(
        'https://recipe-book-1b1f4-default-rtdb.firebaseio.com/recipes.json',
        this.recipeService.getRecipes()
      )
      .subscribe();
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(
        'https://recipe-book-1b1f4-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((response) => {
          return response.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
