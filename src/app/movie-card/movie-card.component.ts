import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleMovieCardComponent } from '../single-movie-card/single-movie-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
// Question: Don't I have to add implements OnInit here, too, just like in the Login and Register components? In the course script that's missing
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  // Question: Why does this work, even if I'm not using implements OnInit?
  ngOnInit(): void {
    this.getMovies();
  }

  // Question: Why is the return type void? That doesn't make sense. I guess I should define the movies array Observable type, or at least write Observable<any>, no?
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

  sortMoviesByTitle(movieA: any, movieB: any): number {
    const titleA = movieA.Title.toUpperCase(); // Convert to uppercase to make the comparison case-insensitive
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
