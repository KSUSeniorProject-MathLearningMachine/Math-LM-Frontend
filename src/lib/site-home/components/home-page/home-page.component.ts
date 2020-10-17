import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../services/home-page/home-page.service';
import { MathLearningMachineApiService } from '../../services/math-learning-machine-api/math-learning-machine-api.service';
import { iSolvedImage } from '../../interfaces/home-page.interface';

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
          console.log(e);
          this.sendImage(e.target.result);
        }.bind(this));

        FR.readAsDataURL(files[0]);
      }

    }
    else (alert("Only .PNG or files are accepted"));
  
  }

  sendImage(imageData) {
    this.mathLearningMachineApiService.solveImage(imageData).subscribe({
      next: (res: iSolvedImage) => {
        console.log(res);
        this.homePageService.setSolutionData(res);
        this.homePageService.setTakingPhoto(false);
      },
      error: (e) => {
        console.log(e);
        this.homePageService.setTakingPhoto(false);
      },
    });
    this.homePageService.setTakingPhoto(false);
  }

  cancelPhotoCapture(){
    this.homePageService.setTakingPhoto(false);
  }
}
