import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleMovieCardComponent } from '../single-movie-card/single-movie-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  // The return type is void because the getMovies method doesn't return anything to the caller. The movies are assigned to the component's property directly within the method, and the subscribe method handles the asynchronous operation.
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp.sort(this.sortMoviesByTitle);
      console.log(this.movies);
      return this.movies;
    });
  }

  openMovieCard(movie: any): void {
    this.dialog.open(SingleMovieCardComponent, {
      data: { movie: movie },
    });
  }

  /**
   * Includes conversion to uppercase to make the comparison case-insensitive
   */
  sortMoviesByTitle(movieA: any, movieB: any): number {
    const titleA = movieA.Title.toUpperCase();
    const titleB = movieB.Title.toUpperCase();

    if (titleA < titleB) {
      return -1;
    } else if (titleA > titleB) {
      return 1;
    } else {
      return 0;
    }
  }
}
