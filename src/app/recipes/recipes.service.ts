import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs-compat';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor() {}

  private selectedRecipeSubject = new BehaviorSubject<Recipe | null>(null);

  selectedRecipe$: Observable<Recipe | null> =
    this.selectedRecipeSubject.asObservable();

  onSelectRecipeItem(recipe: Recipe) {
    this.selectedRecipeSubject.next(recipe);
  }
}
