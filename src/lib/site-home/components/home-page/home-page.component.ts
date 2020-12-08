import { Component, OnInit } from '@angular/core';
import { HomePageService } from '../../services/home-page/home-page.service';
import { MathLearningMachineApiService } from '../../services/math-learning-machine-api/math-learning-machine-api.service';
import { iSolvedImage } from '../../interfaces/home-page.interface';
import { ErrorModalComponent } from '../error-modal/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { specialCharacters } from '../../constants/characters.constant';
import { parse } from 'mathjs';
import { debounce } from 'lodash';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  homePageState = this.homePageService.getState();
  fileToUpload: File = null;
  userInput: any;
  showAnimation: boolean = false;
  valid: boolean = true;
  tooltipError: string = 'Hover to see syntax errors.';
  characterMap = {};

  constructor(
    private homePageService: HomePageService,
    private mathLearningMachineApiService: MathLearningMachineApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkContent = debounce(this.checkContent, 500);
    specialCharacters.forEach((operator) => {
      this.characterMap[operator] = operator;
    });
  }

  startTakingPhoto() {
    this.openSupportedChars();
    this.homePageService.setTakingPhoto(true);
  }

  handleFileInput(files) {
    this.fileToUpload = files.item(0);
    if (this.fileToUpload.type == 'image/png') {
      if (files && files[0]) {
        var FR = new FileReader();
        FR.addEventListener(
          'load',
          function (e) {
            this.sendImage(e.target.result);
          }.bind(this)
        );

        FR.readAsDataURL(files[0]);
      }
    } else {
      const headerContent = this.openDialog(
        'File Type Not Supported.',
        '<h4>Please upload a PNG file.</h4>',
        'Back'
      );
    }
  }

  sendImage(imageData) {
    this.homePageService.setLoadingState(true);
    this.mathLearningMachineApiService.solveImage(imageData).subscribe({
      next: async (res: iSolvedImage) => {
        this.homePageService.setSolutionData(res);
        this.homePageService.setTakingPhoto(false);
        this.homePageService.setLoadingState(false);
        if (parseFloat(res.confidence) < 0.75) {
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
            'Ok'
          );
        }
      },
      error: (error) => {
        this.homePageService.setTakingPhoto(false);
        this.homePageService.setLoadingState(false);

        this.openDialog(
          'Uh Oh, We Are Having A Server Issue.',
          `<h4>${error.message}</h4>`,
          'Back'
        );
      },
    });
  }

  sendLatex(latex: string) {
    this.homePageService.setLoadingState(true);
    this.mathLearningMachineApiService
      .solveLatex(latex)
      .pipe(map((res) => res.solved))
      .subscribe({
        next: (output) => {
          this.homePageService.setSolutionData({
            input_detected: latex,
            solved: output,
            confidence: '1',
            image: '',
          });
          this.homePageService.setLoadingState(false);
        },
        error: (error) => {
          this.homePageService.setLoadingState(false);
          this.openDialog(
            'Uh Oh, We Are Having A Server Issue.',
            `<h4>${error.message}</h4>`,
            'Back'
          );
        },
      });
  }

  cancelPhotoCapture() {
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

  checkContent(input: any) {
    this.userInput = input;
    try {
      input.split('').forEach((char) => {
        if (!this.isAConstant(char) && !this.isAnOperator(char)) {
          throw new Error("Unexpected character '" + char + "'");
        }
      });
      if (input && !/\d/.test(input)) {
        throw new Error('Problem should contain at least 1 number.');
      }
      parse(input);
      this.valid = true;
      this.tooltipError = '✅';
      return true;
    } catch (error) {
      this.valid = false;
      this.tooltipError = error.message;
    }
  }

  solve(event) {
    this.sleep(600).then(() => {
      if (this.valid && this.userInput) {
        this.sendLatex(this.userInput);
      }
    });
    event.preventDefault();
    let input = this.userInput;
    this.showAnimation = true;
    this.showAnimation = false;
  }

  isAConstant(potentialConst: string): boolean {
    if (parseFloat(potentialConst) || parseFloat(potentialConst) === 0) {
      return true;
    }
    if (potentialConst.toLowerCase() != potentialConst.toUpperCase()) {
      return true;
    }
  }

  isAnOperator(potentialOperator: string) {
    return potentialOperator in this.characterMap;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  openSupportedChars() {
    this.openDialog(
      'Important',
      `
        <p>The following characters are currently supported for handwritten math:</p>
        <ul>
          <li>0-9</li>
          <li>Lowercase letters (except i, j, and t)</li>
          <li>+</li>
          <li>-</li>
          <li>=</li>
          <li>( and )</li>
        </ul>
      `,
      'Ok'
    );
  }
}
