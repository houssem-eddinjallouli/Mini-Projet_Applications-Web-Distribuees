import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() { 
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'group-six-cleubs',
        clientId: 'cleubs'
      });
    } 
    return this._keycloak;
   }

   get profile(): UserProfile | undefined {
    return this._profile;
   }

  constructor() { }

  async init(): Promise<void>{
    console.log("Authentification The User...");
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required',
      //checkLoginIframe: false
    });
    if (authenticated){
      console.log("User Authentificated ");
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
    this._profile.token = this.keycloak.token || '';
    }
  }

  async refreshTokenIfNeeded(): Promise<void> {
    if (this.keycloak && this.keycloak.isTokenExpired()) {
      await this.keycloak.updateToken(60); 
    }
  }
  
  
  login(){
    return this.keycloak?.login();
  }

  logout(){
    return this.keycloak?.logout({redirectUri: 'http://localhost:4200'});
  }

  // logout(): void {
  //   this.keycloak?.logout({ redirectUri: window.location.origin });
  // }
}
