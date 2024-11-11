import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {KeycloakService} from '../keycloak/keycloak.service';

// export const authGuard: CanActivateFn = async  () => {
//   const tokenService = inject(KeycloakService);
//   const router = inject(Router);
//   await tokenService.refreshTokenIfNeeded();
  
//   if (tokenService.keycloak.isTokenExpired()) {
//     router.navigate(['login']);
//     return false;
//   }
//   return true;
// };
export const adminGuard: CanActivateFn = async () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  await keycloakService.refreshTokenIfNeeded();

  if (keycloakService.roles.includes('admin')) {
    return true;
  } else {
    router.navigate(['forbidden']);
    return false;
  }
};

export const userGuard: CanActivateFn = async () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  await keycloakService.refreshTokenIfNeeded();

  if (keycloakService.roles.includes('user')) {
    return true;
  } else {
    router.navigate(['forbidden']);
    return false;
  }
};