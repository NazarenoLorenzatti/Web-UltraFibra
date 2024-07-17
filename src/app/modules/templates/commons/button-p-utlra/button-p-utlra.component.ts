import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-p-utlra',
  templateUrl: './button-p-utlra.component.html',
  styleUrls: ['./button-p-utlra.component.css']
})
export class ButtonPUtlraComponent {

    
  @Input() label: string = 'Prueba';

  constructor() { }
  
}
