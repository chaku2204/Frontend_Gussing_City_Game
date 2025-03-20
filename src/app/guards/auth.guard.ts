import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthserviceService } from '../services/authservice.service';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthserviceService);
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
