import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PhotoCaptureComponent } from './components/photo-capture/photo-capture.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorModalComponent } from './components/error-modal/error-modal/error-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HomePageComponent, PhotoCaptureComponent, ErrorModalComponent],
  exports: [HomePageComponent, PhotoCaptureComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
})
export class SiteHomeModule {}
