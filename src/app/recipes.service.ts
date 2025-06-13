import { Injectable } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { Ingredient } from './shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private slService: ShoppingListService) {}
  private recipes = new BehaviorSubject<Recipe[]>([
    new Recipe('New Recipe', 'Fick', 'https://picsum.photos/id/237/200/300', [
      new Ingredient('Meat', 1),
      new Ingredient('Milk', 10),
    ]),
    new Recipe('New Recipe2', 'Yeah', 'https://picsum.photos/id/238/200/300', [
      new Ingredient('Fish', 11),
      new Ingredient('Egg', 120),
    ]),
  ]);

  private selectedRecipe = new BehaviorSubject<Recipe | null>(null);

  recipeList: Observable<Recipe[]> = this.recipes.asObservable();

  selected: Observable<Recipe> = this.selectedRecipe.asObservable();

  getRecipeById(id: number) {
    return this.selectedRecipe.next(this.recipes.getValue()[id]);
  }

  addNewShippingList(newList: Ingredient[]) {
    this.slService.addNewShoppingListFromRecipe(newList);
  }
}
