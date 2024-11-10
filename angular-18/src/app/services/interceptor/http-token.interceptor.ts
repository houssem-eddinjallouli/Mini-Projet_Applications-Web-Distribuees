import { HttpInterceptorFn } from '@angular/common/http';
import { KeycloakService } from '../keycloak/keycloak.service';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  return from(keycloakService.refreshTokenIfNeeded()).pipe(
    switchMap(() => {
      const token = keycloakService.keycloak.token;
      const authReq = token
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          })
        : req;

      return next(authReq);
    })
  );
};
