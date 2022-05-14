import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: shoppingListService) {}

  onAddItem = (form: NgForm) =>
    this.shoppingListService.addIngredient(
      new Ingredient(form.value.name, form.value.amount)
    );
}
