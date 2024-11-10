import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {KeycloakService} from '../keycloak/keycloak.service';

export const authGuard: CanActivateFn = async  () => {
  const tokenService = inject(KeycloakService);
  const router = inject(Router);
  await tokenService.refreshTokenIfNeeded();
  if (tokenService.keycloak.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
