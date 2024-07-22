import { Component, signal, WritableSignal } from '@angular/core';
import { AdsListComponent } from '../ads-list/ads-list.component';
import { AdService } from '../services/ads-service.service';
import { Ad } from '../services/Ad';

@Component({
  selector: 'app-ads-list-page',
  templateUrl: './ads-list-page.component.html',
  styleUrl: './ads-list-page.component.css'
})
export class AdsListPageComponent {
  title = 'Available ads'
  adsSignal! : WritableSignal<Ad[]>;
  
  constructor(private adService: AdService) {
    this.adsSignal = adService.getAdsSignal();
  }

  ngOnInit() {
    this.update()
  }
  
  reload() {
    this.update()
  }
  
  update() {
    const searchData = this.adService.getSearchData();
    this.adService.searchAds(searchData);
  }
}
