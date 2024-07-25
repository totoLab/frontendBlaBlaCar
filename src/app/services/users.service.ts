import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from './User'
import { Observable, single, Subject } from 'rxjs';
import { CommonService } from './common.service';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject = new Subject<User>();
  user$ = this.userSubject.asObservable();

  apiUrl: String
  constructor(private http: HttpClient, private commonService: CommonService, private keycloakService: KeycloakService) {
    this.apiUrl = this.commonService.getApiUrl();
  }

  searchUser(username: String): Observable<User> {
    const userObservable = this.http.get<User>(`${this.apiUrl}/users/${username}`);
    userObservable.subscribe((response) => {
      this.userSubject.next(response);
    });
    return userObservable;
  }

  currentUser(): String {
    return this.keycloakService.profile?.username!;
  }

  usersSignal: WritableSignal<User[]> = signal([]);
  getUsersSignal() {
    return this.usersSignal;
  }

  getUsers(): Observable<User[]>{
    const usersObservable = this.http.get<User[]>(`${this.apiUrl}/users`);
    usersObservable.subscribe((response) => {
      this.usersSignal.set(response);
    });
    return usersObservable;
  }

  stringMsgSignal: WritableSignal<String> = signal("");

  getStringMsgSignal() {
    return this.stringMsgSignal;
  }

  deleteUser() {
    const deleteObservable = this.http.post<String>(`${this.apiUrl}/users/${this.currentUser()}/delete`, {});
    deleteObservable.subscribe((response) => {
      this.stringMsgSignal.set(response);
    });
    return deleteObservable;
  }
}
