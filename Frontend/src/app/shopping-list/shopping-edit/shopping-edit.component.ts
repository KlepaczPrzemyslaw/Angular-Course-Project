import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/Store';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as FromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  @ViewChild('form') myForm: NgForm;

  constructor(private store: Store<FromShoppingList.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
    .subscribe(
      data => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;

          this.myForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredent = new Ingredient(value.name, value.amount);

    if (this.editMode === true) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ ingredient: newIngredent }));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredent));
    }

    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
    this.subscription.unsubscribe();
  }

  onClear() {
    this.editMode = false;
    this.myForm.reset();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
  }
}
