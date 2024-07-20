import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, HeaderComponent],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css'
})
export class AdsListComponent {
  ads = []
  constructor(private client:HttpClient){}

  request(){
    this.client.get<any>("http://localhost:8081/ads").subscribe((response) => {
      this.ads = response
    })
  }

  ngOnInit() {
    this.request()
  }
}
