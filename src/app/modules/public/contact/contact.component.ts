import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  
  constructor() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  goToHome() {
    this.router.navigate(['/app/home']);
  }

}

