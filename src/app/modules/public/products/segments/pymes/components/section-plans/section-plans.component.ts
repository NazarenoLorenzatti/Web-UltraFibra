import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

interface PymesPlan {
  type: string;
  speed: number;
  extra: string;
  price: string;
  period: string;
  featured?: boolean;
}

@Component({
  selector: 'app-section-plans-pymes',
  templateUrl: './section-plans.component.html',
  styleUrls: ['./section-plans.component.css']
})
export class SectionPlansPymesComponent {
  private readonly router = inject(Router);

  public plans: PymesPlan[] = [
    {
      type: 'Comercio',
      speed: 200,
      extra: '+ Cable',
      price: '$34.000',
      period: 'x 6 meses'
    },
    {
      type: 'Comercio',
      speed: 400,
      extra: '+ Cable',
      price: '$39.000',
      period: 'x 6 meses',
      featured: true
    },
    {
      type: 'Comercio',
      speed: 600,
      extra: '+ Cable',
      price: '$44.000',
      period: 'x 6 meses'
    }
  ];

  contratarPlan(plan: PymesPlan): void {
    const promoMonths = this.parsePromoMonths(plan.period);

    this.router.navigate(['/app/contratacion'], {
      queryParams: {
        plan: this.slugify(`${plan.type}-${plan.speed}`),
        name: `${plan.type} ${plan.speed} MB`,
        speed: `${plan.speed} MB`,
        price: this.parsePrice(plan.price),
        extra: plan.extra,
        description: `Internet para Pymes ${plan.type.toLowerCase()} de ${plan.speed} MB ${plan.extra}.`,
        promoMonths
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
