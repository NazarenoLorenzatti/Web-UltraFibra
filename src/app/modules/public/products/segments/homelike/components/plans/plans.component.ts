import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CityService } from 'src/app/modules/services/cities/city.service';
import { Subscription } from 'rxjs';
import { MediaQueryService } from 'src/app/modules/services/media-query/media-query.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
  animations: [
    trigger('scaleAnimation', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('300ms ease-out'))
    ])
  ]
})
export class PlansComponent implements OnDestroy, OnInit {

  public isSmallScreen: boolean = false;
  private subscription!: Subscription;
  private mediaQueryService = inject(MediaQueryService)
  private router = inject(Router);
  private citiesService = inject(CityService);
  public cities!: any[];
  public sidebarVisible: boolean = false;
  public responsiveOptions!: any[];
  public indexCity!: number;
  public isAnimating: boolean = false;
  public hidden: boolean = false;

  ngOnInit(): void {
    this.subscription = this.mediaQueryService.pantallaPequena$.subscribe(
      (isSmallScreen) => {
        this.isSmallScreen = isSmallScreen;
      }
    );
    this.listCities();
    this.setResponsiveOptions();   
  }

  listCities() {
    this.citiesService.listCities().subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.citiesResponse.cities) {
            console.log(data.citiesResponse.cities)
            this.cities = data.citiesResponse.cities;
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  selectCity(index: number): void {
    this.isAnimating = true;
    setTimeout(() => {
      this.indexCity = index - 1;
      this.isAnimating = false;
    }, 100);
  }

  setResponsiveOptions(){
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goToContact(nombrePlan: string, localidad: string) {
    this.router.navigate(['/app/contact'], {
      queryParams: {
        nombrePlan: nombrePlan,
        localidad: localidad,
      }
    });
  }

}


