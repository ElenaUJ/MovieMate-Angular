import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-single-movie-card',
  templateUrl: './single-movie-card.component.html',
  styleUrls: ['./single-movie-card.component.scss'],
})
export class SingleMovieCardComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SingleMovieCardComponent>
  ) {}

  movie: any = this.data.movie;
  displayDirectorDetails: boolean = false;
  displayGenreDetails: boolean = false;

  toggleDirectorDetails(): void {
    this.displayDirectorDetails = !this.displayDirectorDetails;
  }

  toggleGenreDetails(): void {
    this.displayGenreDetails = !this.displayGenreDetails;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
