import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from '../recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolveService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipesService
  ) {}

  recipes: Recipe[];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.recipeService.recipeList.subscribe((data) => (this.recipes = data));
    if (this.recipes.length === 0) {
      return this.dataStorageService.fetchData();
    }
  }
}
