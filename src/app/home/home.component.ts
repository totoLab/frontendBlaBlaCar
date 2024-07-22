import { Component, Input, signal, WritableSignal } from '@angular/core';
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

  departureCitiesSignal: WritableSignal<String[]>;
  arrivalCitiesSignal: WritableSignal<String[]>;
  
  constructor(private adsService: AdService, private router: Router) {
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
      this.redirectFunction("ads");
    }
  }

  redirectFunction(page: String) {
    this.router.navigate(["/", page], {});
  }

}
