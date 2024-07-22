import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad } from './Ad';
import { User } from './User';
import { Booking } from './Booking';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private apiUrl = 'http://localhost:8081';
  
  constructor(private http: HttpClient, private usersService: UsersService) { }
  
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
      const ads = response;
      ads.forEach((ad) => {
        ad.isPublishedOrBooking = false;
        ad.isBooked = false; // TODO check if is booked or
      });
      this.adsSignal.set(ads);
    });
    return adsObserver;
  }

  searchUserAds(username: any): Observable<Ad[]> {
    this.adsSignal.set([]);
    const adsObserver = this.http.get<Ad[]>(`${this.apiUrl}/users/${username}/ads`);
    adsObserver.subscribe((response) => {
      const ads = response;
      ads.forEach((ad) => {
        ad.isPublishedOrBooking = true;
        ad.isBooked = false;
      });
      this.adsSignal.set(ads);
    });
    return adsObserver;
  }

  // Bookings related

  bookingsObserver!:Observable<Booking[]>
  bookingsSignal: WritableSignal<Booking[]> = signal([]);
  userBookedAdsSignal: WritableSignal<Ad[]> = signal([]);

  getBookingsSignal(): WritableSignal<Booking[]> {
    return this.bookingsSignal;
  }

  getuserBookedAdsSignal(): WritableSignal<Ad[]> {
    return this.userBookedAdsSignal;
  }

  searchUserBookings(username: any): Observable<Booking[]> {
    this.bookingsSignal.set([]);
    const bookingsObserver = this.http.get<Booking[]>(`${this.apiUrl}/users/${username}/bookings`);
    bookingsObserver.subscribe((response) => {
      this.bookingsSignal.set(response);

      const ads = response.map(booking => booking.ad);
      ads.forEach((ad) => {
        ad.isPublishedOrBooking = false;
        ad.isBooked = true;
      });
      this.userBookedAdsSignal.set(ads)
    });
    return bookingsObserver;
  }

  bookingMsgObserver!:Observable<String>;
  bookingMsgSignal!: WritableSignal<String>;

  getBookingMsgSignal():WritableSignal<String> {
    return this.bookingMsgSignal;
  }

  bookAd(ad: Ad) {
    const bookingMsgObserver = this.http.post<any>(`${this.apiUrl}/ads/${ad.id}/bookings/new`, {});
    bookingMsgObserver.subscribe((response) => {
      this.bookingMsgSignal.set(response);
    })
    return bookingMsgObserver;
  }

  removeBooking(ad: Ad) {
    const bookingMsgObserver = this.http.post<any>(`${this.apiUrl}/ads/${ad.id}/bookings/cancel`, {});
    bookingMsgObserver.subscribe((response) => {
      this.bookingMsgSignal.set(response);
    })
    return bookingMsgObserver;
  }
}
