import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface Slide {
  name: string;
  velocity: string;
  price: string;
  tiempo: string;
  city?: string;
  route?: string;
}

export interface SlideGroup {
  city: string;
  slides: Slide[];
}

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {
  private readonly router = inject(Router);

  public slidesList: SlideGroup[] = [];

  ngOnInit(): void {
    this.initializeSlides();
  }

  private initializeSlides(): void {
    this.slidesList = [
      {
        city: 'MONJE',
        slides: [
          {
            name: 'COMBO MEGA',
            velocity: '200 MB',
            price: '$22.000',
            tiempo: 'x 3 meses'
          },
          {
            name: 'COMBO SUPER',
            velocity: '400 MB',
            price: '$25.000',
            tiempo: 'x 3 meses'
          },
          {
            name: 'COMBO ULTRA',
            velocity: '600 MB',
            price: '$30.000',
            tiempo: 'x 6 meses'
          }
        ]
      }
    ];
  }

  contratarPlan(item: Slide, city: string): void {
    this.router.navigate(['/app/contratacion'], {
      queryParams: {
        plan: this.slugify(item.name),
        name: item.name,
        speed: item.velocity,
        price: this.parsePrice(item.price),
        extra: '+ TV HD',
        description: 'Conectividad para disfrutar, navegar y mirar TV desde todos tus dispositivos.',
        promoMonths: this.parsePromoMonths(item.tiempo),
        localidad: city
      }
    });
  }

  private parsePrice(value: string): number {
    return Number(value.replace(/\D/g, '')) || 0;
  }

  private parsePromoMonths(value: string): number | undefined {
    const match = value.match(/(\d+)/);
    const months = match ? Number(match[1]) : 0;
    return months > 0 ? months : undefined;
  }

  private slugify(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
