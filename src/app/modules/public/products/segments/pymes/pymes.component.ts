import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-pymes',
  templateUrl: './pymes.component.html',
  styleUrls: ['./pymes.component.css']
})
export class PymesComponent {
  
  private viewportScroller = inject(ViewportScroller);
  
  constructor() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
