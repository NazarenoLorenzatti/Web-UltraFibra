import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-banner-cineplus',
  templateUrl: './banner-cineplus.component.html',
  styleUrls: ['./banner-cineplus.component.css']
})
export class BannerCineplusComponent implements OnInit, OnDestroy {
  private sectionServices = inject(SectionService)
  public section: any;
  public backgroundImageUrl!: string;
  pantallaCelu: MediaQueryList;
  pantallaCeluListener: () => void;
  pantallaPequena: boolean = false;

  constructor(media: MediaMatcher) {
    this.pantallaCelu = media.matchMedia('(max-width: 990px)');
    this.pantallaCeluListener = () => this.detectarCambioPantalla();
    this.pantallaCelu.addEventListener('change', this.pantallaCeluListener);
    
    // Detectar el tipo de pantalla inmediatamente al crear el componente
    this.detectarCambioPantalla();
  }

  ngOnInit(): void {
    // Cargar los datos de la sección después de la detección de pantalla
    this.sectionServices.getSection('banner-cineplus').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
            this.section = data.sectionsWebResponse.sectionsWeb[0];
            this.actualizarImagenFondo();
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });

    // Configurar el efecto de parallax en el scroll
    window.addEventListener('scroll', () => {
      let scrollPosition = window.pageYOffset;
      let parallaxElements = document.querySelectorAll('.parallax-section');

      parallaxElements.forEach((element: Element) => {
        let distanceFromTop = (element as HTMLElement).offsetTop;
        let parallaxFactor = 0.5;

        (element as HTMLElement).style.backgroundPositionY = (distanceFromTop - scrollPosition) * parallaxFactor + 'px';
      });
    });
  }

  detectarCambioPantalla() {
    this.pantallaPequena = this.pantallaCelu.matches;
    this.actualizarImagenFondo();
  }

  actualizarImagenFondo() {
    if (this.section) {
      if (this.pantallaPequena) {
        this.backgroundImageUrl = this.section.imgs[1].urlObs;
      } else {
        this.backgroundImageUrl = this.section.imgs[0].urlObs;
      }
    }
  }

  ngOnDestroy() {
    this.pantallaCelu.removeEventListener('change', this.pantallaCeluListener);
  }
}
