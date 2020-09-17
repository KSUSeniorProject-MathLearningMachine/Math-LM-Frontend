import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PhotoCaptureComponent } from './components/photo-capture/photo-capture.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomePageComponent, PhotoCaptureComponent],
  exports: [HomePageComponent, PhotoCaptureComponent],
  imports: [CommonModule, MatButtonModule, MatCardModule],
})
export class SiteHomeModule {}
