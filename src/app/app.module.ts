// Module houses important dependencies so they can be used across components

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Simplified API facilitation cimmunication of client app with API or server-side
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
