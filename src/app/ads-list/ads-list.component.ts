import { Component, Input, Signal, signal, WritableSignal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AdService } from '../services/ads-service.service';
import { Ad } from '../services/Ad';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css'
})
export class AdsListComponent {

  constructor(private adsService: AdService) {
    this.stringMsgSignal = adsService.getStringMsgSignal()
  }

  @Input() 
    ads!: Ad[];

  @Input()
    title!: String;

  stringMsgSignal!: WritableSignal<String>;
  
  removeAd(ad: Ad) {
    this.adsService.removeAd(ad);
    console.log(`Removing ad ${ad.id}: ${this.stringMsgSignal}`);
  }

  bookAd(ad: Ad) {
    this.adsService.bookAd(ad);
    console.log(`Booking ad ${ad.id}: ${this.stringMsgSignal}`);
  }

  removeBooking(ad: Ad) {
    this.adsService.removeBooking(ad);
    console.log(`Unbooking ad ${ad.id}: ${this.stringMsgSignal}`);
  }
}
