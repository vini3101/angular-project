import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('formReference') slForm!: NgForm;
  subscription!: Subscription;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  editMode = false;

  constructor(private shoppingListService: shoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
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
