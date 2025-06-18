import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });

    this.recipeSubscription = this.recipesService.recipeIndex$.subscribe(
      (index) => {
        this.selected = this.recipesService.getRecipeById(index);
      }
    );
  }

  addNewShippingList(newList: Ingredient[]) {
    this.recipesService.addNewShippingList(newList);
  }

  removeRecipe(index: number) {
    this.recipesService.deleteRecipe(index);
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
