import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-photo-capture',
  templateUrl: './photo-capture.component.html',
  styleUrls: ['./photo-capture.component.scss']
})
export class PhotoCaptureComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @Output() imageData = new EventEmitter<string>();

  constraints: object = {
    video: {
      facingMode: "environment",
      width: { ideal: 3840 },
      height: { ideal: 2160 }
    }
  };

  videoHeight: number = 0;
  videoWidth: number = 0;

  photoCaptureState = new BehaviorSubject<boolean>(false);

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.startCamera();
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  handleError(error) {
    console.log('Error: ', error);
  }

  capture() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    this.photoCaptureState.next(true);
  }

  acceptImage() {
    const canvasElement = this.canvas.nativeElement as HTMLCanvasElement;
    this.imageData.emit(canvasElement.toDataURL());
  }
}
