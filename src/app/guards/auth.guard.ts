import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(CommonService);
  const router = inject(Router);
  const jwthelper = inject(JwtHelperService);
  const token = authService.getToken();
  
  if (token|| !jwthelper.isTokenExpired(token) ) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
