import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';

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
export class PromosSectionComponent implements OnInit, OnDestroy {
  private readonly media = inject(MediaMatcher); // Inyección de dependencia
  private readonly parallaxFactor = 0.5; // Factor de parallax configurable
  public isSmallScreen!: boolean; 
  public slidesList: SlideGroup[] = []; 
  private smallScreenQuery!: MediaQueryList; // Query para pantallas pequeñas
  private smallScreenListener!: () => void; // Listener para el cambio de pantalla

  constructor() {
    this.initializeSlides();
  }

  ngOnInit(): void {
    this.setupMediaQuery();
    this.setupParallaxEffect();
  }

  ngOnDestroy(): void {
    this.cleanUpListeners();
  }

  // Inicializa la lista de slides
  private initializeSlides(): void {
    this.slidesList = [
      {
        city: 'MONJE',
        slides: [
          { name: 'COMBO MEGA', velocity: '100MB', price: '$16.000' },
          { name: 'COMBO SUPER', velocity: '200MB', price: '$18.000' },
          { name: 'COMBO ULTRA', velocity: '300MB', price: '$20.000' },
        ],
      },
      {
        city: 'C BERMÚDEZ',
        slides: [
          { name: 'COMBO MEGA', velocity: '100MB', price: '$16.000' },
          { name: 'COMBO SUPER', velocity: '200MB', price: '$18.000' },
          { name: 'COMBO ULTRA', velocity: '300MB', price: '$20.000' },
        ],
      },
    ];
  }

  // Configura la media query para detectar pantallas pequeñas
  private setupMediaQuery(): void {
    this.smallScreenQuery = this.media.matchMedia('(max-width: 715px)');
    this.isSmallScreen = this.smallScreenQuery.matches;
    this.smallScreenListener = () => {
      this.isSmallScreen = this.smallScreenQuery.matches;
    };

    this.smallScreenQuery.addEventListener('change', this.smallScreenListener);
  }

  // Configura el efecto parallax si no está en pantalla pequeña
  private setupParallaxEffect(): void {
    if (!this.isSmallScreen) {
      window.addEventListener('scroll', this.applyParallaxEffect);
    }
  }

  // Aplica el efecto parallax
  private applyParallaxEffect = (): void => {
    const scrollPosition = window.pageYOffset;
    const parallaxElements = document.querySelectorAll<HTMLElement>('.parallax-section');

    parallaxElements.forEach((element) => {
      const distanceFromTop = element.offsetTop;
      element.style.backgroundPositionY = `${(distanceFromTop - scrollPosition) * this.parallaxFactor}px`;
    });
  };

  // Limpia los listeners de eventos al destruir el componente
  private cleanUpListeners(): void {
    this.smallScreenQuery.removeEventListener('change', this.smallScreenListener);
    if (!this.isSmallScreen) {
      window.removeEventListener('scroll', this.applyParallaxEffect);
    }
  }
}

