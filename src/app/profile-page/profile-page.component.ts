import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { SingleMovieCardComponent } from '../single-movie-card/single-movie-card.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: any;
  topMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getTopMovies();
  }

  // Add return type!!
  getUser(): string | undefined {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      return this.user;
    } else {
      this.router.navigate(['welcome']);
      return;
    }
  }

  getTopMovies() {
    const usersTopMoviesIds = this.user.TopMovies;
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      console.log('getTopMovies response: ' + response);
      this.topMovies = usersTopMoviesIds.map((movieId: string) => {
        return response.find((movie: any) => movie._id === movieId);
      });
      console.log('this are the top movies: ' + this.topMovies);
    });
  }

  openUserUpdateDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      width: '300px',
      data: { user: this.user },
    });
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe({
      next: () => {
        this.snackBar.open('Account has been deleted!', 'OK', {
          duration: 2000,
        });
        localStorage.removeItem('user');
        localStorage.removeItem('user');
        this.router.navigate(['welcome']);
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

  openMovieCard(movie: any): void {
    this.dialog.open(SingleMovieCardComponent, {
      width: '560px',
      data: { movie: movie },
    });
  }
}
