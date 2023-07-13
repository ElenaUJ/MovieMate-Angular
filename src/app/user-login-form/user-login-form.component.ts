import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  // The loginData object is in the format expected by the /login endpoint of the API
  @Input() loginData = { Username: '', Password: '' };

  // Initialization of component and dependencies
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // Implementing function for logging in user: passing loginData object into API call
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
      next: (result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('Login successful', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
