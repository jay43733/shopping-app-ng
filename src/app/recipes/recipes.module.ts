import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { NewComponent } from './new/new.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRouteModule } from './recipes-route.module';
import { SharedModule } from '../shared/shared.module';
import { RecipesService } from '../recipes.service';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    NewComponent,
  ],
  imports: [ReactiveFormsModule, RecipesRouteModule, SharedModule],
})
export class RecipesModule {}
