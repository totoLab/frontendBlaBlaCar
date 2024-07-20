import { Component, signal, WritableSignal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AdService } from '../services/ads-service.service';
import { Ad } from '../services/Ad';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css'
})
export class AdsListComponent {
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
