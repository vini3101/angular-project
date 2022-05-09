import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Onion rings',
      'This is simply a test',
      'https://cdn.ocp.news/2016/04/onio-rings.jpg',
      [
        { name: 'Onion', amount: 1 },
        { name: 'flower', amount: 1 },
        { name: 'baking powder', amount: 1 },
      ]
    ),
    new Recipe(
      "Grandma's meat",
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        { name: 'meat', amount: 1 },
        { name: 'salad', amount: 1 },
      ]
    ),
  ];

  constructor(private shoppingListService: shoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
