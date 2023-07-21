import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-movie-card',
  templateUrl: './single-movie-card.component.html',
  styleUrls: ['./single-movie-card.component.scss'],
})
export class SingleMovieCardComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<SingleMovieCardComponent>,
    public snackBar: MatSnackBar
  ) {}

  movie: any = this.data.movie;
  displayDirectorDetails: boolean = false;
  displayGenreDetails: boolean = false;
  isLiked: boolean = false;

  toggleDirectorDetails(): void {
    this.displayDirectorDetails = !this.displayDirectorDetails;
  }

  toggleGenreDetails(): void {
    this.displayGenreDetails = !this.displayGenreDetails;
  }

  like(): void {
    if (!this.isLiked) {
      this.fetchApiData.addFavouriteMovie(this.data.movie._id).subscribe({
        next: (result) => {
          console.log(result);
          this.snackBar.open('Added to Top Movies', 'OK', {
            duration: 2000,
          });
          localStorage.setItem('user', JSON.stringify(result));
          this.isLiked = true;
        },
        error: (error) => {
          let errorMessage = error.message;

          console.error(errorMessage);
          this.snackBar.open(errorMessage, 'OK', {
            duration: 2000,
          });
        },
      });
    } else if (this.isLiked) {
      this.fetchApiData.deleteFavouriteMovie(this.data.movie._id).subscribe({
        next: (result) => {
          console.log(result);
          this.snackBar.open('Removed from Top Movies', 'OK', {
            duration: 2000,
          });
          localStorage.setItem('user', JSON.stringify(result));
          this.isLiked = false;
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
