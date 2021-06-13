import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AuthApiService } from '../../../services/auth-api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false;
  errorMessage: string = "Error";

  constructor(private _auth: AuthService,
    private _authApi: AuthApiService,
    private _router: Router) { }

  ngOnInit(): void {
    this.isUserLogin();
  }
  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this._authApi.postAuthRequest('/register', form.value).subscribe((res: any) => {
      if (res.status) {
        console.log(res)
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['']);
      } else {
      }
    }, err => {
      this.errorMessage = err['error'].message;
    });
  }
  isUserLogin() {
    console.log(this._auth.getUserDetails())
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
  logout() {
    this._auth.clearStorage();
    console.log("CLEARING STORAGE FROM LOGIN");
    this._router.navigate(['']);
  }
}