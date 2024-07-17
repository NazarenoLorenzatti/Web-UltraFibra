import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {

  private viewportScroller = inject(ViewportScroller);
  
  constructor() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
