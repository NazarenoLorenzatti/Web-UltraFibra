import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-means',
  templateUrl: './means.component.html',
  styleUrls: ['./means.component.css']
})
export class MeansComponent {

  private router = inject(Router);

  navigate(url: string) {
    this.router.navigate([url]);
  }

}
