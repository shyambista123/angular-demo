import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading-service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  if (req.headers.has('X-Skip-Global-Loader')) {
    const clonedReq = req.clone({ headers: req.headers.delete('X-Skip-Global-Loader') });
    return next(clonedReq);
  }
  
  loadingService.show();
  return next(req).pipe(finalize(() => loadingService.hide()));
};
