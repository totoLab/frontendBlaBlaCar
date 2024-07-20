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

  searchAds(searchForm: NgForm) {
    if (searchForm.valid) this.redirectFunction("ads")
    else alert("Compila il form")
  }

  redirectFunction(page: String){
    this.router.navigate(["/", page], {});
  }

}
