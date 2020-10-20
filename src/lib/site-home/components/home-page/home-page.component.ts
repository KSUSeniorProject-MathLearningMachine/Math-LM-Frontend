import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../services/home-page/home-page.service';
import { MathLearningMachineApiService } from '../../services/math-learning-machine-api/math-learning-machine-api.service';
import { iSolvedImage } from '../../interfaces/home-page.interface';
import { ErrorModalComponent } from '../error-modal/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  homePageState = this.homePageService.getState();
  fileUploadService: any;
  fileToUpload: File = null;

  constructor(
    private homePageService: HomePageService,
    private mathLearningMachineApiService: MathLearningMachineApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  startTakingPhoto() {
    this.homePageService.setTakingPhoto(true);
  }

  handleFileInput(files){
    console.log(files);
    this.fileToUpload = files.item(0);
    if(this.fileToUpload.type == "image/png"){
      if (files && files[0]) {

        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
          this.sendImage(e.target.result);
        }.bind(this));

        FR.readAsDataURL(files[0]);
      }

    }
    else {
      const headerContent = 
      this.openDialog(
        "File Type Not Supported.",
        "<h4>Please upload a PNG file.</h4>",
        "Back"
      );
    };
  
  }

  sendImage(imageData) {
    this.homePageService.setLoadingState(true);
    this.mathLearningMachineApiService.solveImage(imageData).subscribe({
      next: async (res: iSolvedImage) => {
        console.log(res);
        this.homePageService.setSolutionData(res);
        this.homePageService.setTakingPhoto(false);
        this.homePageService.setLoadingState(false);
        if(parseFloat(res.confidence) < .75) {
          this.openDialog(
            "We weren't very confident in our answer.",
            `
              <p>You will get the best results if you:</p>
              <ul>
                <li>Write clearly on a white background</li>
                <li>Write in a dark color</li>
                <li>Capture the image up close</li>
                <li>Avoid any extra busyness in the image</li>
              </ul>
            `,
            "Ok"
          );
        }
      },
      error: (error) => {
        console.log(error);
        this.homePageService.setTakingPhoto(false);
        this.homePageService.setLoadingState(false);

        this.openDialog(
          "Uh Oh, We Are Having A Server Issue.",
          `<h4>${error.message}</h4>`,
          "Back"
        );
      },
    });
  }

  cancelPhotoCapture(){
    this.homePageService.setTakingPhoto(false);
  }

  openDialog(headerContent: string, bodyContent: string, buttonText: string) {
    const dialogRef = this.dialog.open(ErrorModalComponent);
    let instance = dialogRef.componentInstance;
    instance.headerContent = headerContent;
    instance.bodyContent = bodyContent;
    instance.buttons = [
      {
        text: buttonText,
        type: 'Primary',
        value: 'back',
      },
    ];
  }
}
