import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BetterHighlightDirective } from './better-highlight.directive';
import { AppRouteModule } from './app.route.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { AuthService } from './auth/auth.service';
import { RecipesService } from './recipes.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, BetterHighlightDirective],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    AppRouteModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AppRouteModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
