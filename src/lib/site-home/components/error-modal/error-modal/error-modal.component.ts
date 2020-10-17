import { Component, Input, OnInit } from '@angular/core';
import { iModalAction } from 'src/lib/site-home/interfaces/home-page.interface';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {
  @Input() headerContent: string;
  @Input() bodyContent: string;
  @Input() buttons: iModalAction[];

  constructor() {}

  ngOnInit(): void {}
}
