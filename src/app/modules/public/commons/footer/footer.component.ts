import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  private router = inject(Router);

  goTo(url: string): void {
    this.router.navigate([url]);
  }

    goTo2(url: string): void {
    window.location.href = url;
  }
}
