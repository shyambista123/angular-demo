import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('[HTTP Error Interceptor] Request Failed:', {
        url: req.urlWithParams,
        status: error.status,
        message: error.message,
        errorBody: error.error,
      });

      return throwError(() => error);
    })
  );
};