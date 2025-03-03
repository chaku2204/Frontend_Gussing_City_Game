import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(CommonService);
  const router = inject(Router);
  
  if (authService.getToken()) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
