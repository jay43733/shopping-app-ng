import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  @Output() selected = new EventEmitter<Recipe>();
  selectedOne: Recipe;

  onSelectRecipe() {
    this.selected.emit(this.selectedOne);
  }

  recipeList: Recipe[] = [
    new Recipe(
      'New Recipe',
      'Description',
      'https://picsum.photos/id/237/200/300'
    ),
    new Recipe(
      'New Recipe2',
      'Description2',
      'https://picsum.photos/id/238/200/300'
    ),
  ];
}
