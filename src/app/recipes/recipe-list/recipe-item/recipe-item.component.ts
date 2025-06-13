import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.subscription = this.recipesService.recipeList.subscribe((recipe) => {
      this.recipes = recipe;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  selectRecipe(id: number) {
    this.recipesService.getRecipeById(id);
  }
}
