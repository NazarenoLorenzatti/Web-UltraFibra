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
  indexLocalidad: number = 0;
  isAnimating: boolean = false;
  oculto: boolean = false;
  private router = inject(Router);
  private citiesService = inject(CityService);
  public cities: any[] = [];

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
        if (data.metadata[0].codigo = "00") {
          console.log(data)
          this.cities = data.citiesResponse.cities;
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
      this.indexLocalidad = index;
      this.isAnimating = false;
    }, 100); 
  }

  localidades: any[] = [
    { 
      id: 0,
      localidad: 'Monje',
      direccion: 'Francisco Caminos 566',
      horario: '08:00 Hs A 12.30 Hs',
      tarjetas: [
        { nombrePlan: 'Mega', precioPlan: '6.500', detallesPlan: 'Internet 25 Megas' },
        { nombrePlan: 'Super', precioPlan: '7.500', detallesPlan: 'Internet 50 Megas' },
        { nombrePlan: 'Ultra', precioPlan: '8.500', detallesPlan: 'Internet 100 Megas' },
        { nombrePlan: 'Corpo', precioPlan: 'Consultar', detallesPlan: 'Hasta 300 Megas' }
      ]
    },
    {
      id: 1,
      localidad: 'Maciel',
      direccion: 'Bv. Maciel 123',
      horario: '08:00 Hs A 17.00 Hs',
      tarjetas: [
        { nombrePlan: 'Mega', precioPlan: '7.500', detallesPlan: 'Internet 25 Megas' },
        { nombrePlan: 'Super', precioPlan: '8.500', detallesPlan: 'Internet 50 Megas' },
        { nombrePlan: 'Ultra', precioPlan: '10.500', detallesPlan: 'Internet 100 Megas' },
        { nombrePlan: 'Corpo', precioPlan: 'Consultar', detallesPlan: 'Hasta 300 Megas' }
      ]
    },
    {
      id: 2,
      localidad: 'Gaboto',
      direccion: 'Calle Gaboto 888',
      horario: '08:00 Hs A 17:00 Hs',
      tarjetas: [
        { nombrePlan: 'Mega', precioPlan: '6.500', detallesPlan: 'Internet 30 Megas' },
        { nombrePlan: 'Super', precioPlan: '7.500', detallesPlan: 'Internet 60 Megas' },
        { nombrePlan: 'Ultra', precioPlan: '8.500', detallesPlan: 'Internet 80 Megas' },
        { nombrePlan: 'Corpo', precioPlan: 'Consultar', detallesPlan: 'Hasta 200 Megas' }
      ]
    },
    {
      id: 3,
      localidad: 'Monje',
      direccion: 'Francisco Caminos 566',
      horario: '08:00 Hs A 12:30 Hs',
      tarjetas: [
        { nombrePlan: 'Mega', precioPlan: '6.500', detallesPlan: 'Internet 25 Megas' },
        { nombrePlan: 'Super', precioPlan: '7.500', detallesPlan: 'Internet 50 Megas' },
        { nombrePlan: 'Ultra', precioPlan: '8.500', detallesPlan: 'Internet 100 Megas' },
        { nombrePlan: 'Corpo', precioPlan: 'Consultar', detallesPlan: 'Hasta 300 Megas' }
      ]
    },
    {
      id: 4,
      localidad: 'Monje',
      direccion: 'Francisco Caminos 566',
      horario: '08:00 Hs A 12.30 Hs',
      tarjetas: [
        { nombrePlan: 'Mega', precioPlan: '6.500', detallesPlan: 'Internet 25 Megas' },
        { nombrePlan: 'Super', precioPlan: '7.500', detallesPlan: 'Internet 50 Megas' },
        { nombrePlan: 'Ultra', precioPlan: '8.500', detallesPlan: 'Internet 100 Megas' },
        { nombrePlan: 'Corpo', precioPlan: 'Consultar', detallesPlan: 'Hasta 300 Megas' }
      ]
    },
    {
      id: 5,
      localidad: 'Monje',
      direccion: 'Francisco Caminos 566',
      horario: '08:00 Hs A 12.30 Hs',
      tarjetas: [
        { nombrePlan: 'Mega', precioPlan: '6.500', detallesPlan: 'Internet 25 Megas' },
        { nombrePlan: 'Super', precioPlan: '7.500', detallesPlan: 'Internet 50 Megas' },
        { nombrePlan: 'Ultra', precioPlan: '8.500', detallesPlan: 'Internet 100 Megas' },
        { nombrePlan: 'Corpo', precioPlan: 'Consultar', detallesPlan: 'Hasta 300 Megas' }
      ]
    },
    {
      id: 6,
      localidad: 'Monje',
      direccion: 'Francisco Caminos 566',
      horario: '08:00 Hs A 12.30 Hs',
      tarjetas: [
        { nombrePlan: 'Mega', precioPlan: '6.500', detallesPlan: 'Internet 25 Megas' },
        { nombrePlan: 'Super', precioPlan: '7.500', detallesPlan: 'Internet 50 Megas' },
        { nombrePlan: 'Ultra', precioPlan: '8.500', detallesPlan: 'Internet 100 Megas' },
        { nombrePlan: 'Corpo', precioPlan: 'Consultar', detallesPlan: 'Hasta 300 Megas' }
      ]
    },
    {
      id: 7,
      localidad: 'Baigorria',
      direccion: 'Calle Falsa 123',
      horario: '08:00 Hs A 17.30 Hs',
      tarjetas: [
        { nombrePlan: 'Mega', precioPlan: '6.500', detallesPlan: '50 Megas' },
        { nombrePlan: 'Super', precioPlan: '7.500', detallesPlan: '100 Megas' },
        { nombrePlan: 'Ultra', precioPlan: '8.500', detallesPlan: '200 Megas' },
        { nombrePlan: 'Corpo', precioPlan: 'Consultar', detallesPlan: 'Hasta 600 Megas' }
      ]
    },
    {
      id: 8,
      localidad: 'Monje',
      direccion: 'Francisco Caminos 566',
      horario: '08:00 Hs A 12.30 Hs',
      tarjetas: [
        { nombrePlan: 'Mega', precioPlan: '6.500', detallesPlan: 'Internet 25 Megas' },
        { nombrePlan: 'Super', precioPlan: '7.500', detallesPlan: 'Internet 50 Megas' },
        { nombrePlan: 'Ultra', precioPlan: '8.500', detallesPlan: 'Internet 100 Megas' },
        { nombrePlan: 'Corpo', precioPlan: 'Consultar', detallesPlan: 'Hasta 300 Megas' }
      ]
    },
    {
      id: 9,
      localidad: 'Baigorria',
      direccion: 'Calle Falsa 123',
      horario: '08:00 Hs A 17.30 Hs',
      tarjetas: [
        { nombrePlan: 'Mega', precioPlan: '6.500', detallesPlan: 'Internet 50 Megas' },
        { nombrePlan: 'Super', precioPlan: '7.500', detallesPlan: 'Internet 100 Megas' },
        { nombrePlan: 'Ultra', precioPlan: '8.500', detallesPlan: 'Internet 200 Megas' },
        { nombrePlan: 'Corpo', precioPlan: 'Consultar', detallesPlan: 'Hasta 600 Megas' }
      ]
    }
  ];

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


