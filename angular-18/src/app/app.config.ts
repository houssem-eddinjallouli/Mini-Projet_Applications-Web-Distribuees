import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { httpTokenInterceptor } from './services/interceptor/http-token.interceptor';
                                           
export function KcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useFactory: () => httpTokenInterceptor,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useValue: httpTokenInterceptor,
    //   multi: true,
    // },
    
    {
      provide: APP_INITIALIZER,
      useFactory: KcFactory,
      deps: [KeycloakService],
      multi: true
    }
  ],
};
