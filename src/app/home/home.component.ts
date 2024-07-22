import { Component, Input, signal, WritableSignal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdService } from '../services/ads-service.service';
import { Observable } from 'rxjs';
import { Ad } from '../services/Ad';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  departureCitiesSignal: WritableSignal<String[]>;
  arrivalCitiesSignal: WritableSignal<String[]>;
  
  constructor(private adsService: AdService, private commonService: CommonService) {
    this.departureCitiesSignal = adsService.getDepartureCitiesSignal();
    this.arrivalCitiesSignal = adsService.getArrivalCitiesSignal();
  }

  ngOnInit() {
    this.reload()
  }

  reload() {
    this.adsService.getCities();
  }

  searchAds(form: NgForm) {
    if (form.valid) {
      const searchData = form.value;
      this.adsService.setSearchData(searchData);
      this.commonService.redirectFunction("ads");
    }
  }

}
