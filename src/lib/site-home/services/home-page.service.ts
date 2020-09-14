import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iHomePageState } from '../interfaces/home-page.interface';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  defaultStateStatus = {
    takingPhoto:false
  }
  homePageState = new BehaviorSubject<iHomePageState>(this.defaultStateStatus);

  getState(){
    return this.homePageState.asObservable();
  }
  updateState(newState){
    const currState = this.homePageState.getValue();
    this.homePageState.next({...currState,...newState})
  }
}
