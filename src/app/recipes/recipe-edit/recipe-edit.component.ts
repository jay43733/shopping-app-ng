import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../../recipes.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  selectedRecipe: Recipe;
  selectedRecipeSubscription: Subscription;
  recipeForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService
  ) {}

  // private initForm() {
  //   let recipeName = '';
  //   let recipeDescription = '';
  //   let recipeImagePath = '';
  //   let recipeIngredients = new FormArray([]);

  //   if (this.editMode && this.selectedRecipe) {
  //     recipeName = this.selectedRecipe.name;
  //     recipeDescription = this.selectedRecipe.description;
  //     recipeImagePath = this.selectedRecipe.imagePath;

  //     if (this.selectedRecipe.ingredientList.length != 0) {
  //       for (let ingredient of this.selectedRecipe.ingredientList) {
  //         recipeIngredients.push(
  //           new FormGroup({
  //             name: new FormControl(ingredient.name, {
  //               validators: [Validators.required],
  //             }),
  //             amount: new FormControl(ingredient.amount, {
  //               validators: [Validators.required],
  //             }),
  //           })
  //         );
  //       }
  //     }

  //     this.recipeForm = new FormGroup({
  //       name: new FormControl(recipeName, {
  //         validators: [Validators.required],
  //       }),
  //       imagePath: new FormControl(recipeImagePath, {
  //         validators: [Validators.required],
  //       }),
  //       description: new FormControl(recipeDescription, {
  //         validators: [Validators.required],
  //       }),
  //       ingredientList: recipeIngredients,
  //     });
  //   }
  // }

  private initForm() {
  this.recipeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ingredientList: new FormArray([]),
  });
}

private updateFormWithRecipe() {
  if (!this.selectedRecipe) return;

  this.recipeForm.patchValue({
    name: this.selectedRecipe.name,
    imagePath: this.selectedRecipe.imagePath,
    description: this.selectedRecipe.description,
  });

  const ingredientsArray = new FormArray([]);

  for (let ingredient of this.selectedRecipe.ingredientList || []) {
    ingredientsArray.push(
      new FormGroup({
        name: new FormControl(ingredient.name, Validators.required),
        amount: new FormControl(ingredient.amount, Validators.required),
      })
    );
  }

  this.recipeForm.setControl('ingredientList', ingredientsArray);
}


  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

      this.selectedRecipeSubscription =
        this.recipeService.recipeIndex$.subscribe((index) => {
          this.selectedRecipe = this.recipeService.getRecipeById(index);
          console.log(this.selectedRecipe);
          this.updateFormWithRecipe()
          
        });
    });
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredientList')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredientList')).push(
      new FormGroup({
        name: new FormControl(null, { validators: [Validators.required] }),
        amount: new FormControl(null, { validators: [Validators.required] }),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredientList')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onSubmit() {
    console.log('Hereeeeeee');
    console.log(this.recipeForm.value);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  ngOnDestroy(): void {
    if (this.selectedRecipeSubscription) {
      this.selectedRecipeSubscription.unsubscribe();
    }
  }
}
