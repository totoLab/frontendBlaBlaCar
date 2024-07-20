import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdService } from '../services/ads-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected to 'styleUrls'
})
export class HomeComponent {

  constructor(private adsService: AdService) {}

  searchAds(searchForm: NgForm) {
    this.adsService.getAds()
  }

}
