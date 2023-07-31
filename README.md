# MovieMate App (Client Side)

## Table of Contents

- [Overview](#overview)
- [How to Run](#how-to-run)
- [Links](#links)
- [Process](#process)
  - [Technologies used](#technologies-used)
  - [Dependencies](#dependencies)
  - [API](#api)
- [Features](#features)

## Overview

MovieMate is a movie app that allows users to access information about different movies. Users can register, update their personal information, and manage a list of their favourite movies.

The client side user interface complements the REST API and MongoDB database which have been [set up previously](https://github.com/ElenaUJ/MyFlix-movie-app), providing a seamless experience for users. Built with the MEAN-stack (MongoDB, Express, Angular, Node.js), MovieMate is a full-stack we application which offers a user-friendly, responsive and efficient solution for those seeking movie information and management.

## How to Run

**Prerequisites**

- Node.js
- npm

**Installation**

Run following commands in your terminal:

1. To clone the repository...
   `git clone https://github.com/ElenaUJ/MovieMate-Angular.git`

2. To navigate to the project directory...
   `cd MovieMate-Angular`

3. To install dependencies...
   `npm install`

**Running the app**

4. Build and start the app by running `ng serve` in your terminal.

5. Once the app is successfully running, open your web browser and navigate to [Localhost 4200](http://localhost:4200/) to access it.

6. Sign up and log in to explore the app's functionalities.

## Links

- [Live site URL](https://elenauj.github.io/MovieMate-Angular/welcome)
- [Code URL](https://github.com/ElenaUJ/MovieMate-Angular)
- [API URL](https://myflix-movie-app-elenauj.onrender.com/)

## Process

### Technologies Used

- Angular
- Angular Material
- TypeScript
- HTML
- CSS

### Dependencies

This project has the following dependencies:

- "@angular/animations": "^16.1.0",
- "@angular/cdk": "^16.1.4",
- "@angular/common": "^16.1.0",
- "@angular/compiler": "^16.1.0",
- "@angular/core": "^16.1.0",
- "@angular/forms": "^16.1.0",
- "@angular/material": "^16.1.4",
- "@angular/platform-browser": "^16.1.0",
- "@angular/platform-browser-dynamic": "^16.1.0",
- "@angular/router": "^16.1.0",
- "rxjs": "~7.8.0",
- "tslib": "^2.3.0",
- "zone.js": "~0.13.0"

And dev dependencies:

- "@angular-devkit/build-angular": "^16.1.3",
- "@angular/cli": "~16.1.3",
- "@angular/compiler-cli": "^16.1.0",
- "@types/jasmine": "~4.3.0",
- "angular-cli-ghpages": "^1.0.6",
- "jasmine-core": "~4.6.0",
- "karma": "~6.4.0",
- "karma-chrome-launcher": "~3.2.0",
- "karma-coverage": "~2.2.0",
- "karma-jasmine": "~5.1.0",
- "karma-jasmine-html-reporter": "~2.1.0",
- "typescript": "~5.1.3"

Furthermore, it uses the following linting configuration:

- [ESLint rules](https://github.com/mydea/simple-pokedex-app/blob/master/.eslintrc)
- [Prettier configuration](https://stackoverflow.com/questions/55430906/prettier-single-quote-for-javascript-and-json-double-quote-for-html-sass-and-c)

### API Documentation

Information about the [API used in this project](https://github.com/ElenaUJ/MyFlix-movie-app) (e.g. endpoints, dependencies, error responses, data security information) can be found [here](https://myflix-movie-app-elenauj.onrender.com/documentation.html).

## Features

- User Authentication: The app allows users to create a new account, login, view and update their profile information, logout, and delete their account.

- Movie Database: The app grants access to a comprehensive movie database that contains information on a collection of movies.

- Detailed Movie Information: MovieMate provides a detailed overview of each selected movie, including an image, description, director and genre.

- Personalized Top Movies List: MovieMate provides users with the ability to create a personalized top movies list by adding their favourite movies. Users can easily add or remove movies from their top movies list using a toggle button to like or dislike movies.
