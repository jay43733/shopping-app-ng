import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientSubscription =
      this.shoppingListService.shoppingList$.subscribe(
        (val) => (this.ingredients = val)
      );
  }

  onEdit(index: number) {
    this.shoppingListService.selectShoppingListByIndex(index);
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }
}
