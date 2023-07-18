import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

// @Component decorator tells Angular the class right below is a component
@Component({
  // Definition of custom HTML element into which component will render, can be used in another HTML template
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
// Component class is implementing the OnInit interface which uses tehe ngOnInit() lifecycle hook
// Optional but recommended if you need to perform initialization tasks for your component
export class UserRegistrationFormComponent implements OnInit {
  // @Input decorator binds/stores form input values from parent component in user object
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  // Initialization of component and dependencies
  constructor(
    public fetchApiData: FetchApiDataService,
    // Passing the component to MatDialogRef
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // Method is called once component has received all its inputs - can initialize fetching data, Observable subscription, set up of component properties
  // Empty for now
  // : void means that there is no return type
  ngOnInit(): void {}

  // Implementing function for registering user: passing userData object into API call
  // Sending form input to backend
  registerUser(): void {
    // Go to userRegistration service in fetchApiData and pass it the userData object
    // subscribe method is called on resulting Observable
    this.fetchApiData.userRegistration(this.userData).subscribe({
      // Success callback function
      next: (result) => {
        console.log(result);
        // Logic for successful user registration will be implemented here
        // Will close modal on success
        this.dialogRef.close();
        // Second argument 'OK' represents action button
        this.snackBar.open('Successfully signed up. Please log in!', 'OK', {
          duration: 2000,
        });
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
