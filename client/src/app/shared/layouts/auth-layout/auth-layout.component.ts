import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  selectModalComponent: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  modalLogin() {
   this.selectModalComponent = true;
  }

  modalRegister() {
   this.selectModalComponent = false;
  }
}
