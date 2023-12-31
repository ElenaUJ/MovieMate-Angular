import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Simplified API facilitation cimmunication of client app with API or server-side
import { HttpClientModule } from '@angular/common/http';
// App routing
import { RouterModule, Routes } from '@angular/router';

// Check if we even use it
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UserUpdateFormComponent } from './user-update-form/user-update-form.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SingleMovieCardComponent } from './single-movie-card/single-movie-card.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfilePageComponent },
  // Redirect to welcome if user is not logged in?
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
];

/**
 * Entry point for Angular app
 * Module houses important dependencies so they can be used across components
 */
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    ProfilePageComponent,
    UserUpdateFormComponent,
    NavigationBarComponent,
    SingleMovieCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
