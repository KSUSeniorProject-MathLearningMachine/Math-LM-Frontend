import { Component, OnInit } from '@angular/core';
import { HomePageService} from '../../services/home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  homePageState = this.homepageservice.getState();

  constructor(private homepageservice:HomePageService) { }

  ngOnInit(): void {
  }

  startTakingPhoto(){
    this.homepageservice.updateState({takingPhoto:true});
  }

}
