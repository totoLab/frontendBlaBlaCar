import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdService } from '../services/ads-service.service';
import { Observable } from 'rxjs';
import { Ad } from '../services/Ad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private adsService: AdService, private router: Router) {}

  searchAds(form: NgForm) {
    if (form.valid) {
      const searchData = form.value;
      this.adsService.setSearchData(searchData);        // what's missing?
      this.redirectFunction("ads");
    }
  }

  redirectFunction(page: String){
    this.router.navigate(["/", page], {});
  }

}
