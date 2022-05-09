import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private ingredientsChanged!: Subscription;

  constructor(private shoppingListService: shoppingListService) {}

  handleIngredientsAssignment(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChanged =
      this.shoppingListService.ingredientsChanged.subscribe(
        this.handleIngredientsAssignment.bind(this)
      );
  }

  ngOnDestroy() {
    this.ingredientsChanged.unsubscribe();
  }
}
