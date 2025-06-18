import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  onNavigate() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
