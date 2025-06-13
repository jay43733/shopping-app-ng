import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoute } from './app.route.module';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoute)],
};
