import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../error-modal/error-modal/error-modal.component';

@Component({
  selector: 'app-photo-capture',
  templateUrl: './photo-capture.component.html',
  styleUrls: ['./photo-capture.component.scss'],
})
export class PhotoCaptureComponent implements AfterViewInit {
  @ViewChild('video', { static: false }) videoElement: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @Output() imageDataUpdated = new EventEmitter<string>();
  @Output() canceled = new EventEmitter();

  constraints: object = {
    video: {
      facingMode: 'environment',
      width: { ideal: 3840 },
      height: { ideal: 2160 },
    },
  };

  videoHeight: number = 0;
  videoWidth: number = 0;

  photoCaptured = new BehaviorSubject<boolean>(false);

  constructor(private renderer: Renderer2, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.startCamera();
  }

  startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.handleError.bind(this));
    } else {
      this.openDialog(`
        <p>Try one of the following:</p>
        <ul>
          <li>Verify that your camera/webcam is working</li>
          <li>Make sure no other applications are using your camera</li>
          <li>Check your firewall permissions</li>
          <li>Upload your image instead</li>
        </ul>
      `);
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(
      this.videoElement.nativeElement,
      'srcObject',
      stream
    );
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  handleError(error) {
    if(error.name === 'NotAllowedError'){
      this.openDialog(`
      <h4>Access Was Denied. Please take one following steps:</h4>
      <ul>
        <li>Clear your permissions for this page in your browser and select <br> allow next time
          <a href="https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DDesktop&hl=en">
            (Chrome Instructions Here)
          </a>
        </li>
        <li>Check your firewall permissions</li>
      </ul>
    `);
    }
    else {
      this.openDialog(`
      <p>Try one of the following:</p>
      <ul>
        <li>Verify that your camera/webcam is working</li>
        <li>Make sure no other applications are using your camera</li>
        <li>Check your firewall permissions</li>
        <li>Upload your image instead</li>
      </ul>
      `);
    }
    console.log(error);
  }

  capture() {
    this.renderer.setProperty(
      this.canvas.nativeElement,
      'width',
      this.videoWidth
    );
    this.renderer.setProperty(
      this.canvas.nativeElement,
      'height',
      this.videoHeight
    );
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.videoElement.nativeElement, 0, 0);
    this.photoCaptured.next(true);
  }

  retake() {
    this.photoCaptured.next(false);
  }

  acceptImage() {
    const canvasElement = this.canvas.nativeElement as HTMLCanvasElement;
    this.imageDataUpdated.emit(canvasElement.toDataURL());
  }

  openDialog(bodyContent: string) {
    const dialogRef = this.dialog.open(ErrorModalComponent);
    let instance = dialogRef.componentInstance;
    instance.headerContent = "Uh Oh! We can't seem to access your camera.";
    instance.bodyContent = bodyContent;
    instance.buttons = [
      {
        text: 'Cancel',
        type: 'Subtle',
        value: 'cancel',
      },
      {
        text: 'Try Again',
        type: 'Primary',
        value: 'retry',
      },
    ];
    dialogRef.afterClosed().subscribe((result) => {
      if(result === 'retry'){
        this.startCamera();
      }
      else if(result === 'cancel'){
        this.cancel();
      }
    });
  }

  cancel(){
    this.canceled.emit();
  }
}
