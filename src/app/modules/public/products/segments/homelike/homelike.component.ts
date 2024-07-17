import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-homelike',
  templateUrl: './homelike.component.html',
  styleUrls: ['./homelike.component.css']
})
export class HomelikeComponent {

  private viewportScroller = inject(ViewportScroller);
  
  constructor() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
  
}
