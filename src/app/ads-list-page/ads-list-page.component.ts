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

  adsSignal! : WritableSignal<Ad[]>;
  ads!: Ad[];
  
  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ads = []
    this.update()
  }
  
  reload() {
    this.update()
  }
  
  update() {
    this.adsSignal = this.adService.getAdsSignal();
    const searchData = this.adService.getSearchData();
    
    this.adService.searchAds(searchData).subscribe((ads) => {
      this.ads = ads;
    });
  }
}
