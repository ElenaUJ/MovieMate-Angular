import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: any;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  // Add return type!!
  getUser(): string | undefined {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      return this.user;
    } else {
      this.router.navigate(['welcome']);
      return;
    }
  }

  openUserUpdateDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      width: '280px',
    });
  }
}
