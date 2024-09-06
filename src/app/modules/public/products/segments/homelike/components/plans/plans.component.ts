import { Component, OnDestroy, OnInit, inject} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CityService } from 'src/app/modules/services/cities/city.service';

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
export class PlansComponent implements OnDestroy, OnInit{

  public pantallaCelu: MediaQueryList;
  pantallaCeluListener: () => void;
  pantallaPequena: boolean = false;
  sidebarVisible: boolean = false;
  responsiveOptions!: any[];
  indexLocalidad!: number;
  isAnimating: boolean = false;
  oculto: boolean = false;
  private router = inject(Router);
  private citiesService = inject(CityService);
  public cities!: any[] ;

  constructor(media: MediaMatcher) {
    this.pantallaCelu = media.matchMedia('(max-width: 768px)');
    this.pantallaCeluListener = () => {
      this.detectarCambioPantalla();
    };
    this.listCities();
    this.pantallaCelu.addEventListener('change', this.pantallaCeluListener);
  }

  listCities(){
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
      this.indexLocalidad = index - 1;
      this.isAnimating = false;
    }, 100); 
  }

  
  ngOnInit(): void {
    this.detectarCambioPantalla();
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }  
  
  detectarCambioPantalla() {
    this.pantallaPequena = this.pantallaCelu.matches;
  }

  ngOnDestroy() {
    this.pantallaCelu.removeEventListener('change', this.pantallaCeluListener);
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


