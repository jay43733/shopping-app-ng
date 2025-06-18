import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { NewComponent } from './recipes/new/new.component';
import { RecipeResolveService } from './recipes/recipe-resolve.service';

const appRoute: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: [RecipeResolveService],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
        resolve: [RecipeResolveService],
      },
      {
        path: 'new',
        component: NewComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolveService],
      },

      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolveService],
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule],
})
export class AppRouteModule {}
