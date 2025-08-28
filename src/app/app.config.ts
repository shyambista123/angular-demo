import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';
import { GlobalErrorHandler } from './error/handler/global-error-handler';
import { httpErrorInterceptor } from './error/interceptor/http-error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, loadingInterceptor, httpErrorInterceptor])
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
