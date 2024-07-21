import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad } from './Ad';
import { Booking } from './Booking';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private apiUrl = 'http://localhost:8081';
  
  constructor(private http: HttpClient) { }
  
  // Ads related
  
  adsObserver!:Observable<Ad[]>
  adsSignal: WritableSignal<Ad[]> = signal([]);
  private searchData: any;
  
  getAdsSignal(): WritableSignal<Ad[]> {
    return this.adsSignal;
  }

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

  // Bookings related

  bookingsObserver!:Observable<Booking[]>
  bookingsSignal: WritableSignal<Booking[]> = signal([]);

  getBookingsSignal(): WritableSignal<Booking[]> {
    return this.bookingsSignal;
  }

  searchUserBookings(username: any): Observable<Booking[]> {
    this.bookingsSignal.set([]);
    const bookingsObserver = this.http.get<Booking[]>(`${this.apiUrl}/users/${username}/bookings`);
    bookingsObserver.subscribe((response) => {
      this.bookingsSignal.set(response);
    });
    return bookingsObserver;
  }
}
