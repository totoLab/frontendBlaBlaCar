import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AdService } from '../services/ads-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected to 'styleUrls'
})
export class HomeComponent {

  constructor(private adsService: AdService) {}

  searchAds(searchForm: NgForm) {
    this.adsService.getAds()
  }

}
