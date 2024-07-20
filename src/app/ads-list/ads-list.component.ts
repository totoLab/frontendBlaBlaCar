import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css'
})
export class AdsListComponent {
  ads = []

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.ads = navigation.extras.state['data'];
    }
  }

  ngOnInit(): void {}

}
