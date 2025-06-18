import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { BetterHighlightDirective } from './better-highlight.directive';
import { DropdownDirective } from './dropdown.directive';
import { AppRouteModule } from './app.route.module';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { NewComponent } from './recipes/new/new.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    ShoppingEditComponent,
    RecipeItemComponent,
    BetterHighlightDirective,
    DropdownDirective,
    RecipeEditComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    AppRouteModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AppRouteModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
