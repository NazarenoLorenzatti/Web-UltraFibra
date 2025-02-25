import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-element-self-management',
  templateUrl: './element-self-management.component.html',
  styleUrls: ['./element-self-management.component.css']
})
export class ElementSelfManagementComponent {
  private router = inject(Router);

  goTo(nav: string) {
    this.router.navigate([nav]);
  }
}
