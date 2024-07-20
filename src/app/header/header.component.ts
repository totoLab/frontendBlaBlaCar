import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated: boolean = false; 

  login() {
    // Logic for login action
    console.log('Login button clicked');
  }

  signup() {
    // Logic for signup action
    console.log('Signup button clicked');
  }
}
