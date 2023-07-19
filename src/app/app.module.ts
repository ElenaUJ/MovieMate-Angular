// Entry point for Angular app
// Module houses important dependencies so they can be used across components

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Simplified API facilitation cimmunication of client app with API or server-side
import { HttpClientModule } from '@angular/common/http';
//App routing
import { RouterModule, Routes } from '@angular/router';

// Question: What is this AppRoutingModule for? Are we even using it, because out reouting is managed by the RouterModule?
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Do I need this and where should it go? Was added during Material installation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material components
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UserUpdateFormComponent } from './user-update-form/user-update-form.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfilePageComponent },
  // Question: Is pathmatch: 'prefix' even necessary here?
  // Question: What if the user is logged in? It would be better to redirect to the movies page?
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    ProfilePageComponent,
    UserUpdateFormComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
