import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthApiService } from './../../../services/auth-api.service'
import { AuthService } from './../../../services/auth.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() updateUser = new EventEmitter<User>();
  user: User | undefined

  isLogin: boolean = false
  errorMessage: string = "Error";
  constructor(
    private _api: AuthApiService,
    private _auth: AuthService,
    private _router: Router
  ) { }
  ngOnInit() {
    this.isUserLogin();
  }
  onSubmit(form: NgForm) {

    this._api.postAuthRequest('register', form.value).subscribe((res: any) => {

      if (res.status) {
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this.updateUser.emit(<User>res.data);
        this._router.navigate(['login']);
        this._auth.userSubject.next(<User>res.data)
      } else {
        alert(res.error);
      }
    }, err => {
      console.log("RESPONSE ERROR: ", err);
      this.errorMessage = err['error'].message;
    });
  }
  isUserLogin() {
    let user: User | undefined | null = this._auth.getUserDetails();
    if (user != null) {
      this.updateUser.emit(<User>user);
      this.isLogin = true;
    }
  }
}