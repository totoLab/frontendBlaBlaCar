import { Component, WritableSignal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../services/User';
import { UsersService } from '../services/users.service';
import { AdService } from '../services/ads-service.service';
import { Ad } from '../services/Ad';
import { Booking } from '../services/Booking';

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
  
  ngOnInit() {
    this.adsSignal = this.adService.getAdsSignal();
    this.userBookedAdsSignal = this.adService.getuserBookedAdsSignal();
    
    this.reload()
  }
  
  reload() {
    this.getUserInfo()
    this.getUserAds()
    this.getuserBookedAds();
  }
  
  getUserInfo() {
    this.usersService.user$.subscribe((user) => {
      this.user = user;
    });
    this.usersService.searchUser(this.username);
  }
  
  publishedTitle = "Published by user"
  adsSignal! : WritableSignal<Ad[]>;
  getUserAds() {
    this.adService.searchUserAds(this.username);
  }

  bookedTitle = 'Booked by user'
  userBookedAdsSignal! : WritableSignal<Ad[]>;
  getuserBookedAds() {
    this.adService.searchUserBookings(this.username);
  }
}
