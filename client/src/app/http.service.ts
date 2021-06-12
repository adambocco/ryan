import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './shared/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  apiUrl: string = 'http://localhost:4201/api/';


  httpOptions: Object = {
    headers: new HttpHeaders({
    })
  }

  constructor(private http: HttpClient) {  }

  getResponse() {
    return this.http.get(this.apiUrl);
  }

  getList() : Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + 'newsletter',this.httpOptions);
  }

  addUser(user: User) {
    return this.http.post<User>(this.apiUrl + 'newsletter', user, this.httpOptions);
  }

  deleteUser(user: User) {
    return this.http.delete<User>(this.apiUrl + 'newsletter/' + user.id, this.httpOptions);
  }
}
