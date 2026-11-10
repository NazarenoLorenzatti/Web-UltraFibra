import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CityService } from 'src/app/modules/services/cities/city.service';
import { MediaQueryService } from 'src/app/modules/services/media-query/media-query.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnDestroy, OnInit {

  public isSmallScreen = false;
  public cities: any[] = [];
  public indexCity: number | undefined;

  private subscription?: Subscription;
  private mediaQueryService = inject(MediaQueryService);
  private router = inject(Router);
  private citiesService = inject(CityService);

  ngOnInit(): void {
    this.subscription = this.mediaQueryService.pantallaPequena$.subscribe(
      (isSmallScreen) => this.isSmallScreen = isSmallScreen
    );

    this.listCities();
  }

  listCities(): void {
    this.citiesService.listCities().subscribe({
      next: (data: any) => {
        if (data?.metadata?.[0]?.codigo === '00' && data?.citiesResponse?.cities) {
          this.cities = data.citiesResponse.cities;
          this.indexCity = undefined;
        }
      },
      error: (error: any) => {
        console.error('Error loading cities', error);
      }
    });
  }

  selectCity(cityId: number, index?: number): void {
    if (typeof index === 'number') {
      this.indexCity = index;
      return;
    }

    const fallbackIndex = this.cities.findIndex(city => city.id === cityId);
    this.indexCity = fallbackIndex >= 0 ? fallbackIndex : undefined;
  }

  contratarPlan(plan: any, localidad: string): void {
    this.router.navigate(['/app/contratacion'], {
      queryParams: {
        plan: this.slugify(plan?.nombrePlan || plan?.name || 'plan'),
        name: plan?.name || plan?.nombrePlan || 'Plan UltraFibra',
        speed: plan?.details || '',
        price: this.parsePrice(plan?.price),
        extra: '+ CABLE',
        description: 'Conectividad para disfrutar, navegar y mirar TV desde todos tus dispositivos.',
        promoMonths: this.parsePromoMonths(plan?.mesesPromocion ?? plan?.promoMonths ?? plan?.monthsPromotion),
        localidad
      }
    });
  }

  private parsePrice(value: unknown): number {
    if (typeof value === 'number') return value;

    const numeric = String(value ?? '').replace(/\D/g, '');
    return Number(numeric) || 0;
  }

  private parsePromoMonths(value: unknown): number | undefined {
    const months = Number(value);
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
