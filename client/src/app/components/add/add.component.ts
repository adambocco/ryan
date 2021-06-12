import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { User } from '../../shared/models/User';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  user: User | undefined;
  showErrors: boolean = false;
  showSuccess: boolean = false;
  busyAdding: boolean = false;

  userForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])]
  })

  constructor(private _http: HttpService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  onClick() {
    if (this.userForm.valid) {

      this.user = <User>{name: this.name?.value, email:this.email?.value}
      this.busyAdding = true;
      
      this._http.addUser(this.user).subscribe(data => {
        this.busyAdding = false;
        this.userForm.reset();

        this.showSuccess = true;
        setTimeout(()=> {
          this.showSuccess = false;
        }, 3000);
    })
    }
    else {
      this.showErrors = true;
      setTimeout(()=> {
        this.showErrors = false;
      }, 3000);
    }
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

}
