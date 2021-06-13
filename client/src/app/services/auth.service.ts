import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../shared/models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject: Subject<User> = new Subject();

  constructor() { }
  getUserDetails() {
    return localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null;
  }
  setDataInLocalStorage(variableName: any, data: any) {
    localStorage.setItem(variableName, data);
    this.userSubject.next(<User>data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  clearStorage() {
    this.userSubject.next(undefined);
    localStorage.clear();
  }
}