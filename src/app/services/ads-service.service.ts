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
  private searchData: any;

  constructor(private http: HttpClient) { }

  setSearchData(searchData: any) {
    this.searchData = searchData;
  }

  getSearchData() {
    return this.searchData
  }

  searchAds(searchData: any): Observable<Ad[]> {
    this.adsSignal.set([]);
    const adsObserver = this.http.post<Ad[]>(`${this.apiUrl}/ads`, searchData);
    adsObserver.subscribe((response) => {
      this.adsSignal.set(response);
    });
    return adsObserver;
  }

  searchUserAds(username: any): Observable<Ad[]> {
    this.adsSignal.set([]);
    const adsObserver = this.http.get<Ad[]>(`${this.apiUrl}/users/${username}/ads`);
    adsObserver.subscribe((response) => {
      this.adsSignal.set(response);
    });
    return adsObserver;
  }
}
