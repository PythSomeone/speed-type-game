import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  userLoggedIn: boolean = false

  constructor() {
  }

  ngOnInit(): void {
    this.userLoggedIn = !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token')
    this.ngOnInit()
  }
}
