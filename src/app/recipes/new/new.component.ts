import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent {
  newForm = new FormGroup({
    name: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ingredientList: new FormArray([], Validators.required),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService
  ) {}

  onAddIngredient() {
    (<FormArray>this.newForm.get('ingredientList')).push(
      new FormGroup({
        name: new FormControl(null, { validators: [Validators.required] }),
        amount: new FormControl(null, { validators: [Validators.required] }),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  get controls() {
    // a getter!
    return (<FormArray>this.newForm.get('ingredientList')).controls;
  }

  onSubmit() {
    const result = new Recipe(
      this.newForm.get('name').value,
      this.newForm.get('description').value,
      this.newForm.get('imagePath').value,
      this.newForm.get('ingredientList').value
    );
    this.recipeService.addRecipe(result);
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
