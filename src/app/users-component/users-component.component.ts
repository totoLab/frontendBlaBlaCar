import { Component, WritableSignal } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../services/User';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.component.html',
  styleUrl: './users-component.component.css'
})
export class UsersComponentComponent {

  usersSignal: WritableSignal<User[]>;
  constructor( private userService: UsersService) { 
    this.usersSignal = userService.getUsersSignal();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers();
  }

}
