// Services are separate entities that isolate data, operations on data (fetching, saving etc) or both
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, ObservedValuesFromArray, of, throwError } from 'rxjs';
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
  // Observable is a concept of a data stream that changes over time (asynchonous and synchronous)
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    // .post() is a method of the HttpClient module to post the user Details to API and return API response, first argument concatenates the apiUrl/users, and the second argument is the data sent in the body of the POST request
    return (
      this.http
        .post(apiUrl + 'users', userDetails)
        // .pipe() combines functions, takes them as arguments and returns a function that runs them in sequence
        // In this case, it is needed because the API response is an Observable, in this case asynchronous/changing over time, and errors have to be caught continuously
        .pipe(catchError(this.handleError))
    );
  }

  // Authentication happens server side
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);

    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies/directors/' + directorName, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'movies/genres/' + genreName, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // No endpoint in API
  // public getUser(username: string): Observable<any> {
  //   const token = localStorage.getItem('token');

  //   return this.http
  //     .get(apiUrl + 'users' + username, {
  //       headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
  //     })
  //     .pipe(map(this.extractResponseData), catchError(this.handleError));
  // }

  // No endpoint in API
  public getFavouriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + 'users/' + username + '/topMovies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public addFavouriteMovie(username: string, movieid: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .post(apiUrl + 'users/' + username + '/topMovies/' + movieid, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public deleteFavouriteMovie(
    username: string,
    movieid: string
  ): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + 'users/' + username + '/topMovies/' + movieid, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public editUser(username: string, updatedDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(updatedDetails);

    return this.http
      .put(apiUrl + 'users/' + username, updatedDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        // Making sure the component recognizes a status code of 200 as successful and doesn't throw and error
        catchError((error: any): any => {
          if (error.status === 200) {
            console.log('status is 200');
            // of turns the response into an Observable as required by the deleteUser function
            return of(error);
          } else {
            this.handleError;
          }
        })
      );
  }

  // res type can be Response or Object
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    // Default error message
    let errorMessage = 'An error occurred. Please try again later.';
    console.log('handeError block is being executed');

    if (error.error instanceof ErrorEvent) {
      console.error(
        'Some error occurred on the client-side',
        error.error.message
      );
      // API error with specific message
    } else if (error.error?.message) {
      errorMessage = error.error.message;
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${errorMessage}`
      );
      // API validation error array
    } else if (Array.isArray(error.error.errors)) {
      const errorMessages = error.error.errors.map(
        (errorItem: any) => errorItem.msg
      );
      errorMessages.forEach((errorMsg: string) => {
        if (errorMsg.includes('is required')) {
          errorMessage = 'Please complete all fields';
        } else {
          errorMessage = errorMsg;
        }
      });
      console.error(`Error Status code ${error.status}, ` + `Validation error`);
      // API error with unknown/unexpected format
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }

    return throwError(
      // Question: I spent quite some time on tweaking the error handling to return the message the API sends upon login/registration, because I wanted the snack bar to show a more detailed error message. Is there a better/smarter/more straightforward way of doing it (feels pretty bulky, everything), and should I rather somehow include the logic in the components?
      () => new Error(errorMessage)
    );
  }
}
