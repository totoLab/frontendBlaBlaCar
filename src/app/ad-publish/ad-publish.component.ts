import { Component, WritableSignal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdService } from '../services/ads-service.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-ad-publish',
  templateUrl: './ad-publish.component.html',
  styleUrl: './ad-publish.component.css'
})
export class AdPublishComponent {

  constructor(private adsService: AdService, private commonService: CommonService) {
    this.stringMsgSignal = adsService.getStringMsgSignal()
  }

  stringMsgSignal!: WritableSignal<String>;
  
  publish(form: NgForm) {
    this.adsService.publishAd(form.value)
    console.log("Published ad: " + this.stringMsgSignal);
  }
}
