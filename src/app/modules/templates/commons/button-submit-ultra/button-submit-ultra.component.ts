import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-submit-ultra',
  templateUrl: './button-submit-ultra.component.html',
  styleUrls: ['./button-submit-ultra.component.css']
})
export class ButtonSubmitUltraComponent {
  @Input() label: string = 'Prueba';
  @Input() disable: boolean = false;
}
