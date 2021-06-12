import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../shared/models/User';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user!: User;
  @Output() updateEvent = new EventEmitter<User>();

  constructor(private _http: HttpService) { }

  ngOnInit(): void {
  }

  deleteUser() {
    this._http.deleteUser(this.user).subscribe(data => {
      this.updateEvent.emit(this.user);
    })
  }
}
