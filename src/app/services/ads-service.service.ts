import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad } from './Ad';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private apiUrl = 'http://localhost:8081';
  
  getAdsSignal(): WritableSignal<Ad[]> {
    return this.adsSignal;
  }

  adsObserver!:Observable<Ad[]>
  adsSignal: WritableSignal<Ad[]> = signal([]);

  constructor(private http: HttpClient) { }

  getAds(): Observable<Ad[]> {
    this.adsSignal.set([]);
    this.adsObserver = this.http.get<Ad[]>(`${this.apiUrl}/ads`);
    this.adsObserver.subscribe((response) => {
      this.adsSignal.set(response);
    });
    return this.adsObserver;
  }
}
