import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService
  ) {}

  saveData() {
    this.recipeService.recipeList.subscribe((recipes) => {
      this.http.post(`http://localhost:3300/recipes`, recipes).subscribe();
    });
  }

  fetchData() {
    return this.http.get('http://localhost:3300/recipes').pipe(
      catchError((errorMessage) => throwError(errorMessage)),
      tap((recipe: Recipe[]) => this.recipeService.setRecipes(recipe))
    );
  }
}
