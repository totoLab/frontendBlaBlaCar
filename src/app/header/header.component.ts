import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private usersServices: UsersService) {}

  isAuthenticated: boolean = true; 
  username: String = '';
  
  ngOnInit() {
    if (this.isAuthenticated) {
      this.username = this.usersServices.currentUser()
    }
  }

  login() {
    // Logic for login action
    console.log('Login button clicked');
  }

  signup() {
    // Logic for signup action
    console.log('Signup button clicked');
  }
}
