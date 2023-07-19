import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss'],
})
export class UserUpdateFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  currentUser: any;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getCurrentUsername(): string {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user.Username;
    }
    return '';
  }

  getUpdatedUserData(): any {
    let updatedUserData: {
      Username?: string;
      Password?: string;
      Email?: string;
      Birthday?: string;
    } = {};

    if (this.userData.Username !== '') {
      updatedUserData.Username = this.userData.Username;
    }
    if (this.userData.Password !== '') {
      updatedUserData.Password = this.userData.Password;
    }
    if (this.userData.Email !== '') {
      updatedUserData.Email = this.userData.Email;
    }
    if (this.userData.Birthday !== '') {
      updatedUserData.Birthday = this.userData.Birthday;
    }

    return updatedUserData;
  }

  updateUser(): void {
    this.fetchApiData
      .editUser(this.getCurrentUsername(), this.getUpdatedUserData())
      .subscribe({
        next: (result) => {
          console.log(result);
          this.dialogRef.close();
          this.snackBar.open('Update successful!', 'OK', {
            duration: 2000,
          });
          localStorage.setItem('user', JSON.stringify(result));
          // Question: I just wanted the user info to updatein the UI after sending the request to the server. I feel like this is a dirty verion, but is it acceptable?
          window.location.reload();
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
