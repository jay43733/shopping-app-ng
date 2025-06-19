import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  private closeSub: Subscription;
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
          this.showErrorAlert(this.errorMessage);
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
          this.showErrorAlert(this.errorMessage);
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

  private showErrorAlert(errorMessage: string) {
    const alertComponent =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponent);
    componentRef.instance.message = errorMessage;
    this.closeSub = componentRef.instance.resetError.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
