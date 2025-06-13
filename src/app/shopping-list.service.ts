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
}
