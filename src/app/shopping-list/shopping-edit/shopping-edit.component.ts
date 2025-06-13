import { Component, ElementRef, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', { static: false }) name: ElementRef;
  @ViewChild('numberInput', { static: false }) number: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  addNewIngredient() {
    const nameInput = this.name.nativeElement.value;
    const numberInput = this.number.nativeElement.value;
    const newIngredient = new Ingredient(nameInput, numberInput);
    this.shoppingListService.addNewShoppingList(newIngredient);
    this.name.nativeElement.value = '';
    this.number.nativeElement.value = null;
  }

  removeInput() {
    this.name.nativeElement.value = '';
    this.number.nativeElement.value = null;
  }
}
