import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: any;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

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

  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user.Username).subscribe({
      next: () => {
        this.snackBar.open('Account has been deleted!', 'OK', {
          duration: 2000,
        });
        localStorage.removeItem('user');
        localStorage.removeItem('user');
        this.router.navigate(['welcome']);
      },
      error: (error) => {
        let errorMessage = error.message;

        console.error(errorMessage);
        this.snackBar.open(errorMessage, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
