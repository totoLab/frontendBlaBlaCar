import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad } from './Ad';
import { User } from './User';
import { Booking } from './Booking';
import { UsersService } from './users.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  
  private apiUrl: String;
  constructor(private http: HttpClient, private usersService: UsersService, private commonService: CommonService) { 
    this.apiUrl = this.commonService.getApiUrl();
  }
  
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

  searchAds(searchData: any, username: String): Observable<Ad[]> {
    const adsObserver = this.http.post<Ad[]>(`${this.apiUrl}/ads`, searchData);
    adsObserver.subscribe((response) => {
      const ads = response;
      this.searchUserBookings(username);
      const bookings = this.userBookedAdsSignal();

      ads.forEach((ad) => {
        ad.isPublishedOrBooking = false;
  
        ad.isBooked = bookings.some((userAd) => {
          return (
            userAd.departureCity === ad.departureCity &&
            userAd.arrivalCity === ad.arrivalCity &&
            userAd.departureTime === ad.departureTime &&
            userAd.arrivalTime === ad.arrivalTime &&
            userAd.date === ad.date &&
            userAd.twoBackSeats === ad.twoBackSeats
          );
        });
      });
  
      this.adsSignal.set(ads);
    },
    (error) => {
      // Handle any errors
      console.error('Error fetching ads:', error);
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


  publishAd(ad: Ad): Observable<String> {
    const publishedAdObserver = this.http.post<String>(`${this.apiUrl}/ads/ad`, ad)
    publishedAdObserver.subscribe((response) => {
      this.stringMsgSignal.set(response)
    })
    return publishedAdObserver;
  }

  removeAd(ad: Ad): Observable<String> {
    const removeAdObserver = this.http.post<String>(`${this.apiUrl}/ads/${ad.id}/delete`, {});
    removeAdObserver.subscribe((response) => {
      this.stringMsgSignal.set(response)
    });
    return removeAdObserver;
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

  bookAd(ad: Ad) {
    const bookingMsgObserver = this.http.post<any>(`${this.apiUrl}/ads/${ad.id}/bookings/new`, {});
    bookingMsgObserver.subscribe((response) => {
      this.stringMsgSignal.set(response);
    })
    return bookingMsgObserver;
  }

  removeBooking(ad: Ad) {
    const bookingMsgObserver = this.http.post<any>(`${this.apiUrl}/ads/${ad.id}/bookings/cancel`, {});
    bookingMsgObserver.subscribe((response) => {
      this.stringMsgSignal.set(response);
    })
    return bookingMsgObserver;
  }

  // utils

  stringMsgSignal: WritableSignal<String> = signal("");

  getStringMsgSignal():WritableSignal<String> {
    return this.stringMsgSignal;
  }

  citiesObserver!:Observable<{ departureCities: String[], arrivalCities: String[] }>;
  departureCitiesSignal: WritableSignal<String[]> = signal([]);
  arrivalCitiesSignal: WritableSignal<String[]> = signal([]);

  getDepartureCitiesSignal(): WritableSignal<String[]> {
    return this.departureCitiesSignal;
  }

  getArrivalCitiesSignal() {
    return this.arrivalCitiesSignal;
  }

  getCities() {
    const citiesObserver = this.http.get<{ departureCities: String[], arrivalCities: String[] }>(`${this.apiUrl}/ads/cities`);
    citiesObserver.subscribe((response) => {
      this.departureCitiesSignal.set(response["departureCities"]);
      this.arrivalCitiesSignal.set(response["arrivalCities"]);
    });
    return citiesObserver;
  }

}
