import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from './User'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8081';

  private userSubject = new Subject<User>();
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

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
