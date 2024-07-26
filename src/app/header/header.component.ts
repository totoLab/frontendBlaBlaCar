import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { KeycloakService } from '../services/keycloak.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private usersServices: UsersService, private keycloakService: KeycloakService) {}

  isAuthenticated: Boolean | undefined; 
  username: String = '';
  
  async ngOnInit() {
    this.isAuthenticated = await this.keycloakService.keycloak.authenticated;
    if (this.isAuthenticated) {
      this.username = this.usersServices.currentUser();
    }
  }

  async login() {
    await this.keycloakService.login()
  }

  async logout() {
    await this.keycloakService.logout()
  }
}
