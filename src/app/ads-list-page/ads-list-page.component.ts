import { Component, signal, WritableSignal } from '@angular/core';
import { AdsListComponent } from '../ads-list/ads-list.component';
import { AdService } from '../services/ads-service.service';
import { Ad } from '../services/Ad';
import { CommonService } from '../services/common.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-ads-list-page',
  templateUrl: './ads-list-page.component.html',
  styleUrl: './ads-list-page.component.css'
})
export class AdsListPageComponent {
  title = 'Available ads'
  adsSignal: WritableSignal<Ad[]>;
  
  constructor(private adService: AdService, private commonService: CommonService, private userService: UsersService) {
    this.adsSignal = adService.getAdsSignal();
  }

  ngOnInit() {
    this.update()
  }
  
  reload() {
    this.commonService.redirectFunction("home")
  }
  
  update() {
    const searchData = this.adService.getSearchData();
    this.adService.searchAds(searchData, this.userService.currentUser());
  }
}
