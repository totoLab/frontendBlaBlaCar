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
    this.updateAds();  
  }

  reload() {
    this.updateAds();  
  }

  updateAds() {
    this.allAds()
    
  }

  allAds() {
    this.adsSignal = this.adService.getAdsSignal();
    this.adService.getAds().subscribe(
      (data) => {
        this.ads = data;
      },
      (error) => {
        console.error('Error fetching ads:', error);
      }
    );
  }

}
