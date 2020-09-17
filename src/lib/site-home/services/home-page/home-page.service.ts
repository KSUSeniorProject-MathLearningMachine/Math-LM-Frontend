import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  iHomePageState,
  iSolvedImage,
} from '../../interfaces/home-page.interface';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  defaultStateStatus = {
    takingPhoto: false,
    solutionData: {
      confidence: '.99',
      input_detected: 'yeeahw',
      solved: 'asdfasdf',
    },
    showOutput: true,
  };
  homePageState = new BehaviorSubject<iHomePageState>(this.defaultStateStatus);

  getState() {
    return this.homePageState.asObservable();
  }

  updateState(newState) {
    const currState = this.homePageState.getValue();
    this.homePageState.next({ ...currState, ...newState });
  }

  setTakingPhoto(value: boolean) {
    this.updateState({ takingPhoto: value });
  }

  setSolutionData(solutionData: iSolvedImage) {
    this.updateState({ solutionData, showOutput: true });
  }
}
