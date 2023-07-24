import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  loggedIn: Boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setStatus();
  }

  setStatus(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  onLogOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
