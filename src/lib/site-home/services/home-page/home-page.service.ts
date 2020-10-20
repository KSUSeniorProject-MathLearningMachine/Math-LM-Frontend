import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
      confidence: '0',
      input_detected: '',
      solved: '',
    },
    showOutput: false,
    loading: false
  };
  homePageState = new BehaviorSubject<iHomePageState>(this.defaultStateStatus);
  httpClient: any;

  getState() {
    return this.homePageState.asObservable();
  }

  updateState(newState) {
    const currState = this.homePageState.getValue();
    this.homePageState.next({ ...currState, ...newState });
    console.log(this.homePageState);
  }

  handleError(e: any) {
    throw new Error('Method not implemented.');
  }

  setTakingPhoto(value: boolean) {
    this.updateState({ takingPhoto: value });
  }

  setSolutionData(solutionData: iSolvedImage) {
    this.updateState({ solutionData, showOutput: true });
  }

  setLoadingState(loading: boolean) {
    this.updateState({ loading });
  }
}
