import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'blablacar',
        clientId: 'blablacar'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  constructor() { }

  async init() {
    console.log("Authenticating the user...")
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required'
    });
    if (authenticated) {
      console.log("User authenticated")
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token || '';
    }
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    return this.keycloak.logout();
  }
}
