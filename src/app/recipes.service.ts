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
  // private recipes = new BehaviorSubject<Recipe[]>([
  //   new Recipe('New Recipe', 'Fick', 'https://picsum.photos/id/237/200/300', [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('Milk', 10),
  //   ]),
  //   new Recipe('New Recipe2', 'Yeah', 'https://picsum.photos/id/238/200/300', [
  //     new Ingredient('Fish', 11),
  //     new Ingredient('Egg', 120),
  //   ]),
  // ]);

  private recipes = new BehaviorSubject<Recipe[]>([]);

  recipeList: Observable<Recipe[]> = this.recipes.asObservable();

  private recipeIndex = new BehaviorSubject<number>(null);

  recipeIndex$ = this.recipeIndex.asObservable();

  setRecipes(fetchedRecipes: Recipe[]) {
    this.recipes.next(fetchedRecipes);
  }

  selectRecipeId(id: number) {
    return this.recipeIndex.next(id);
  }

  getRecipeById(id: number) {
    return this.recipes.getValue()[id];
  }

  addNewShippingList(newList: Ingredient[]) {
    this.slService.addNewShoppingListFromRecipe(newList);
  }

  addRecipe(recipe: Recipe) {
    const newList = [...this.recipes.getValue()];
    newList.push(recipe);
    this.recipes.next(newList);
  }

  updateRecipe(index: number, recipe: Recipe) {
    const newList = [...this.recipes.getValue()];
    newList[index] = recipe;
    this.recipes.next(newList);
  }

  deleteRecipe(index: number) {
    const newList = [...this.recipes.getValue()];
    newList.splice(index, 1);
    this.recipes.next(newList);
  }
}
