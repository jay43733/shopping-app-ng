import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) name: ElementRef;
  // @ViewChild('numberInput', { static: false }) number: ElementRef;

  editMode: boolean = false;
  editedItemIndex: number;
  selectedEditItem: Ingredient;
  editedItemSubscription: Subscription;

  form = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    amount: new FormControl(null, { validators: [Validators.required] }),
  });

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.editedItemSubscription =
      this.shoppingListService.selectedShoppingIndex$.subscribe((index) => {
        this.editedItemIndex = index;
        this.selectedEditItem = this.shoppingListService.getShoppingListByIndex(
          this.editedItemIndex
        );
        if (this.selectedEditItem) {
          this.editMode = true;
          this.form.setValue({
            name: this.selectedEditItem?.name,
            amount: this.selectedEditItem?.amount,
          });
        } else {
          console.log('No item');
        }
      });
  }

  ngOnDestroy(): void {
    this.editedItemSubscription.unsubscribe();
  }

  addNewIngredient() {
    // const nameInput = this.name.nativeElement.value;
    // const numberInput = this.number.nativeElement.value;
    if (this.form.valid) {
      const nameInput = this.form.get('name').value;
      const amountInput = this.form.get('amount').value;
      const newIngredient = new Ingredient(nameInput, amountInput);
      if (this.editMode) {
        this.shoppingListService.updateShoppingList(
          this.editedItemIndex,
          newIngredient
        );
        this.editMode = false;
        this.form.reset();
      } else {
        this.shoppingListService.addNewShoppingList(newIngredient);
        this.editMode = false;
        this.form.reset();
      }
    } else {
      return;
    }
  }

  deleteShoppingList() {
    this.shoppingListService.deleteShoppingList(this.editedItemIndex);
    this.editMode = false;
    this.form.reset();
  }

  clearInput() {
    this.editMode = false;
    this.form.reset();
  }
}
