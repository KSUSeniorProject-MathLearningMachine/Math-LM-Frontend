import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PhotoCaptureComponent } from './components/photo-capture/photo-capture.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ErrorModalComponent } from './components/error-modal/error-modal/error-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MathJaxComponent } from './components/math-jax/math-jax/math-jax.component';
import { GlobalService } from 'src/app/global.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomePageComponent,
    PhotoCaptureComponent,
    ErrorModalComponent,
    MathJaxComponent,
  ],
  exports: [HomePageComponent, PhotoCaptureComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTooltipModule,
  ],
  providers: [GlobalService],
})
export class SiteHomeModule {}
