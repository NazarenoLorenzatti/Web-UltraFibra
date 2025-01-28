import { Component} from '@angular/core';

// Interfaces para los datos
export interface Slide {
  name: string;
  velocity: string;
  price: string;
}

export interface SlideGroup {
  city: string;
  slides: Slide[];
}

@Component({
  selector: 'app-promos-section',
  templateUrl: './promos-section.component.html',
  styleUrls: ['./promos-section.component.css'],
})
export class PromosSectionComponent {
  
}

