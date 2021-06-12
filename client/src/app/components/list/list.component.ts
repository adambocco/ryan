import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[] = [];
  deletedUser: User | undefined;
  showSuccess: boolean = false;

  constructor(private _http: HttpService) { }

  ngOnInit(): void {

    this._http.getResponse().subscribe(data => {
      console.log(data);
    })
  }

  updateUsers(deletedUser: User) {
    this.users = this.users.filter(user => user.id !== deletedUser.id)
    this.showSuccess = true;
    this.deletedUser = deletedUser;
    setTimeout(()=> {
      this.showSuccess = false;
      this.deletedUser = undefined;
    }, 3000);
  }

  trackUsers(_: number, item: User) {
    return item.id;
  }

}
