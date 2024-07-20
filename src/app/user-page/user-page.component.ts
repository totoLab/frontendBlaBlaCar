import { Component, WritableSignal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../services/User';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  username: any;

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UsersService) { 
    this.route.paramMap.subscribe(param => {
      this.username = param.get('username');
    });
  }

  usersSignal!: WritableSignal<User>;
  user!: User;

  ngOnInit() {
    this.usersService.user$.subscribe((user) => {
      this.user = user;
    });
    this.usersService.searchUser(this.username);
  }

  reload() {
    this.ngOnInit()
  }
}
