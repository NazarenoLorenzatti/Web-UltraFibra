import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-government',
  templateUrl: './government.component.html',
  styleUrls: ['./government.component.css']
})
export class GovernmentComponent {

  private viewportScroller = inject(ViewportScroller);
  
  constructor() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
