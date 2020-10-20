import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteHomeModule } from '../lib/site-home/site-home.module';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from './global.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SiteHomeModule, HttpClientModule],
  providers: [GlobalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
