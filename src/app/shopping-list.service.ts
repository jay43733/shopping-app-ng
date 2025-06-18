import { Injectable } from '@angular/core';
import { Ingredient } from './shared/ingredient.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor() {}

  private shoppingLists = new BehaviorSubject<Ingredient[]>([
    new Ingredient('Tomato', 10),
    new Ingredient('Orange', 14),
  ]);

  private selectedShoppingIndex = new BehaviorSubject<number>(null);

  selectedShoppingIndex$ = this.selectedShoppingIndex.asObservable();

  shoppingList$ = this.shoppingLists.asObservable();

  addNewShoppingList(newShoppingList: Ingredient) {
    const newList = [...this.shoppingLists.value, newShoppingList];
    this.shoppingLists.next(newList);
  }

  addNewShoppingListFromRecipe(newList: Ingredient[]) {
    const newShoppingList = [...this.shoppingLists.value];
    newList.map((list) => {
      const existingItem = newShoppingList.find(
        (item) => item.name === list.name
      );

      if (existingItem) {
        existingItem.amount += list.amount;
      } else {
        newShoppingList.push(list);
      }
    });

    this.shoppingLists.next(newShoppingList);
  }

  updateShoppingList(index: number, newIngredient: Ingredient) {
    const newShoppingList = [...this.shoppingLists.getValue()];
    newShoppingList[index] = newIngredient;
    this.shoppingLists.next(newShoppingList);
  }

  deleteShoppingList(i: number) {
    const newShoppingList = [...this.shoppingLists.getValue()];
    newShoppingList.splice(i, 1);
    this.shoppingLists.next(newShoppingList);
    console.log(newShoppingList);
  }

  selectShoppingListByIndex(index: number) {
    this.selectedShoppingIndex.next(index);
  }

  getShoppingListByIndex(index: number): Ingredient {
    return this.shoppingLists.getValue()[index];
  }
}
