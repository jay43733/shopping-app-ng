import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListRouteModule } from './shopping-list.route.module';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListService } from '../shopping-list.service';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    SharedModule,
    ShoppingListRouteModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ShoppingListModule {}
