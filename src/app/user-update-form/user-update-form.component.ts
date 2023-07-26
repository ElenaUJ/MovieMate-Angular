import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: any,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

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

    return Object.keys(updatedUserData).length === 0 ? null : updatedUserData;
  }

  updateUser(): void {
    const updatedUserData = this.getUpdatedUserData();

    if (!updatedUserData) {
      this.snackBar.open('No changes to update!', 'OK', {
        duration: 2000,
      });
      return;
    }

    this.fetchApiData.editUser(updatedUserData).subscribe({
      next: (result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('Update successful!', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(result));
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
