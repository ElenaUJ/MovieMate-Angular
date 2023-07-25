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

  ngOnInit(): void {
    this.userData = {
      Username: this.user.Username,
      Password: this.user.Password,
      Email: this.user.Email,
      Birthday: this.user.Birthday,
    };
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
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
