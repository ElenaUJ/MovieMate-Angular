// Services are separate entities that isolate data, operations on data (fetching, saving etc) or both
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
// Question: Couldn't I just import all rxjs modules from 'rxjs'? What's the difference?
import { Observable, ObservedValuesFromArray, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Moviemate backend API URL
const apiUrl = 'https://myflix-movie-app-elenauj.onrender.com/';

// Decorator: function that extends the functionality of a piece of code, without directly changing it
// Here: Making this service available everywhere (root)
// Done by placing right in front of class keyword
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  // `public` identifier makes this method accessible from outside the class
  // Observable is a concept of a data stream that changes over time
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    // .post() is a method of the HttpClient module to post the user Details to API and return API response, first argument concatenates the apiUrl/users, and the second argument is the data sent in the body of the POST request
    return (
      this.http
        .post(apiUrl + 'users', userDetails)
        // .pipe() combines functions, takes them as arguments and returns a function that runs them in sequence
        // In this case, it is needed because the API response is an Observable, asynchronous/changing over time, and errors have to be caught continuously
        // Question: Did I understand it correctly? Does Observable mean it has to be asynchronous?
        // Question: Why does pipe not have to be imported if it's a method of the RxJS library? Because it is run on the RxJS Observable?
        .pipe(catchError(this.handleError))
    );
  }

  // Question: Shouldn't there be much more to be done to authenticate? Is there logic missing? Wouldn't even know where to start...
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);

    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return (
      this.http
        .get(apiUrl + 'movies', {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        })
        // Question: The squiggly line is because Response is not an Object/ any (which is needed for the map method), correct? So shall I change the extractResponseData's res type to be Object, or any?
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies' + title, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies/directors' + directorName, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies/genres' + genreName, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Question: I don't have an endpoint in my API for this. Didn't need it for my React app. Do I need to make one for the Angular client-side?
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'users' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Question: Same here. Don't have an endpoint for this.
  // Question: A thing that just came to my mind, is it ok to always have Obervable<any> as return type because it could be anything including error objects?
  public getFavouriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'users' + username + 'topMovies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public addFavouriteMovie(username: string, movieid: string): Observable<any> {
    const token = localStorage.getItem('token');

    return (
      this.http
        .post(apiUrl + 'users' + username + 'topMovies' + movieid, {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        })
        // Question: Do I need the response here? It's the updated user object. Or will I handle that through my (new) getUser service/endpoint?
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  public deleteFavouriteMovie(
    username: string,
    movieid: string
  ): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + 'users' + username + 'topMovies' + movieid, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public editUser(username: string, updatedDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(updatedDetails);

    return this.http
      .put(
        apiUrl + 'users' + username,
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        },
        updatedDetails
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + 'users' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error(
        'Some error occurred on the client-side',
        error.error.message
      );
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    // An observable error is returned (occurrs during the stream's execution)
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
    // Question: First, I used the throwError the way it was in the course (see below) but got a warning it's deprecated. Can you please check that I did it the right way now?
    // return throwError('Something bad happened; please try again later.');
  }
}
