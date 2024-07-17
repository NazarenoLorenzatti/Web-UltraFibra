import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private viewportScroller = inject(ViewportScroller);
  
  constructor() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
