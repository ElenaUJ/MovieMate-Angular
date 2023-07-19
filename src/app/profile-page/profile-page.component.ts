import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  // Add return type!!
  getUser(): string | undefined {
    console.log('getUser has been called');
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      return this.user;
    } else {
      this.router.navigate(['welcome']);
      return;
    }
  }
}
