import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit, DoCheck {

  /*selectAuthComponent: boolean = true;*/

  showLogout = false;

  links = [
    { url: '/quiz', name: 'Quiz' },
    { url: '/results', name: 'Results' },
    { url: '/login', name: 'Login' },
    { url: '/register', name: 'Register' },
  ];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if(this.auth.isAuthenticated()) {
      this.showLogout = true;
    } else {
      this.showLogout = false;
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  /*modalLogin() {
   this.selectAuthComponent = true;
  }

  modalRegister() {
   this.selectAuthComponent = false;
  }*/
}
