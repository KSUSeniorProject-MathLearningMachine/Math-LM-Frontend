import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../services/home-page/home-page.service';
import { MathLearningMachineApiService } from '../../services/math-learning-machine-api/math-learning-machine-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  homePageState = this.homePageService.getState();

  constructor(private homePageService: HomePageService, private mathLearningMachineApiService: MathLearningMachineApiService) { }

  ngOnInit(): void {
  }

  startTakingPhoto() {
    this.homePageService.setTakingPhoto(true);
  }

  sendImage(imageData) {
    this.mathLearningMachineApiService.solveImage(imageData).subscribe({
      next: (res) => {
        console.log(res);
        this.homePageService.setTakingPhoto(false);
      },
      error: (e) => {
        console.log(e);
        this.homePageService.setTakingPhoto(false);
      }
    });
    this.homePageService.setTakingPhoto(false);
  }
}
