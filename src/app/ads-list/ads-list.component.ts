import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AdService } from '../services/ads-service.service';
import { Ad } from '../services/Ad';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css'
})
export class AdsListComponent {
  @Input() 
    ads!: Ad[];

}
