import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteHomeModule } from '../lib/site-home/site-home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SiteHomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
