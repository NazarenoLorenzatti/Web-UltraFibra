import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.css']
})
export class ManualsComponent {

  private readonly router = inject(Router);

  download(link: string): void {
    window.open(link, '_blank', 'noopener,noreferrer');
  }
}
