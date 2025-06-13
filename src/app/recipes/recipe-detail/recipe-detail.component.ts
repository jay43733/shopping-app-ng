import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipesService } from '../../recipes.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selected: Recipe;
  id: number;
  recipeSubscription: Subscription;
  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'] - 1;
    });

    this.recipeSubscription = this.recipesService.selected.subscribe(
      (recipe) => {
        this.selected = recipe;
      }
    );
  }

  addNewShippingList(newList: Ingredient[]) {
    this.recipesService.addNewShippingList(newList);
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
