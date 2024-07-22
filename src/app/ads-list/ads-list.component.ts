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
    this.bookingMsgSignal = adsService.getBookingMsgSignal()
  }

  @Input() 
    ads!: Ad[];

  @Input()
    title!: String;


  bookingMsgSignal!: WritableSignal<String>;
  
  bookAd(ad: Ad) {
    this.adsService.bookAd(ad);
    console.log(this.bookingMsgSignal)
  }

  removeBooking(ad: Ad) {
    this.adsService.removeBooking(ad);
    console.log(this.bookingMsgSignal)
  }
}
