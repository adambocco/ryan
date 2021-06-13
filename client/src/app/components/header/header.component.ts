import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User | undefined;

  title: string = 'Treehouse Newsletter Signup';
  

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    console.log("HEADER INIT")
    this._auth.userSubject.subscribe(data => {
      this.user = <User>data;
    })
  }

  getUser() {
    return <User>this._auth.getUserDetails();
  }
}
