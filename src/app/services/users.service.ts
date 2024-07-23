import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from './User'
import { Observable, Subject } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private userSubject = new Subject<User>();
  user$ = this.userSubject.asObservable();
  
  apiUrl: String
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  searchUser(username: String): Observable<User> {
    const userObservable = this.http.get<User>(`${this.apiUrl}/users/${username}`);
    userObservable.subscribe((response) => {
      this.userSubject.next(response);
    });
    return userObservable;
  }

  // modify when using auth
  currentUser(): String {
    return 'toto';
  }
}
