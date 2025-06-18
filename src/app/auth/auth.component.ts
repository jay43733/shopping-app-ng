import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginMode = true;

  isLoading = false;

  errorMessage = null;

  onClearErrorMessage() {
    this.errorMessage = null;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const email = form.form.value.email;
    const password = form.form.value.password;
    const signupForm = { email, password };
    if (form.form.invalid) {
      return;
    }
    if (this.loginMode) {
      this.authService.login(signupForm).subscribe({
        error: (error) => {
          this.errorMessage = error.error;
          this.isLoading = false;
        },
        next: (response) => {
          console.log(response);
          this.router.navigate(['/recipes']);
          form.form.reset();
        },
        complete: () => (this.isLoading = false),
      });
    } else {
      this.authService.signup(signupForm).subscribe({
        error: (error) => {
          this.errorMessage = error.error;
          this.isLoading = false;
        },
        next: (response) => {
          console.log(response);
          this.router.navigate(['/recipes']);
          form.form.reset();
        },
        complete: () => (this.isLoading = false),
      });
    }
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }
}
