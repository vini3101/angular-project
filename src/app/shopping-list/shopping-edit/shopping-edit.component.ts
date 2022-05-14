import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editedItemIndex!: number;
  editMode = false;

  constructor(private shoppingListService: shoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
      }
    );
  }

  onAddItem = (form: NgForm) =>
    this.shoppingListService.addIngredient(
      new Ingredient(form.value.name, form.value.amount)
    );

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
