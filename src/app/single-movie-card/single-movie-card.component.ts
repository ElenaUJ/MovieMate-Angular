import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-movie-card',
  templateUrl: './single-movie-card.component.html',
  styleUrls: ['./single-movie-card.component.scss'],
})
export class SingleMovieCardComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<SingleMovieCardComponent>,
    public snackBar: MatSnackBar
  ) {}

  movie: any = this.data.movie;
  isLiked: boolean = false;

  ngOnInit(): void {
    this.setLikedState();
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
          this.setLikedState();
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
          this.setLikedState();
          this.fetchApiData.updateUserObject.next();
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

  // Question: There's one thing I haven't quite understood yet. I'm going to use this as an example. So here, to get to the topMovies array, I am pulling the user from the storage. Ultimately, I just want to chekc if this movie is in there or not. Now, Should I initialize some of the variables at the top of the class, e.g. topMovies: any[] = [], or can I just define constants in here, because I won't further use the array here other than for this check.
  setLikedState() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const topMovies = user?.TopMovies;
    this.isLiked =
      topMovies.filter((movieId: string) => movieId === this.data.movie._id)
        .length > 0;
  }
}
