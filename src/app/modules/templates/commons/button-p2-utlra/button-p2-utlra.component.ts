import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-p2-utlra',
  templateUrl: './button-p2-utlra.component.html',
  styleUrls: ['./button-p2-utlra.component.css']
})
export class ButtonP2UtlraComponent {

  @Input() label: string = 'Prueba';
  @Input() url: string = '#';

  private router = inject(Router);

  navigate(){
    this.router.navigate([this.url]);
  }
}
