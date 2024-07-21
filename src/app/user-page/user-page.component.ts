import { Component, WritableSignal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../services/User';
import { UsersService } from '../services/users.service';
import { AdService } from '../services/ads-service.service';
import { Ad } from '../services/Ad';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  username: any;

  constructor(private router: Router, private route: ActivatedRoute,
    private usersService: UsersService, private adService: AdService) { 
    this.route.paramMap.subscribe(param => {
      this.username = param.get('username');
    });
  }

  usersSignal!: WritableSignal<User>;
  user!: User;

  adsSignal! : WritableSignal<Ad[]>;
  userAds!: Ad[];

  ngOnInit() {
    this.getUserAds()
    this.getUserInfo()
  }

  reload() {
    this.ngOnInit()
  }

  getUserInfo() {
    this.usersService.user$.subscribe((user) => {
      this.user = user;
    });
    this.usersService.searchUser(this.username);
  }

  getUserAds() {
    this.adsSignal = this.adService.getAdsSignal();
    this.adService.searchUserAds(this.username).subscribe((ads) => {
      this.userAds = ads;
    });
  }
}
