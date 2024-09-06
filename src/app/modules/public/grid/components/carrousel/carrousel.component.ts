import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  public responsiveOptions!: any[];
  private sectionServices = inject(SectionService);
  public section: any;
  pantallaCelu: MediaQueryList;
  pantallaCeluListener: () => void;
  pantallaPequena: boolean = false;
  public sectionName: string = 'carrousel-grid-responsive';

  constructor(media: MediaMatcher) {
    this.pantallaCelu = media.matchMedia('(max-width: 1130px)');
    this.pantallaCeluListener = () => {
      this.detectarCambioPantalla();
    };
    this.pantallaCelu.addEventListener('change', this.pantallaCeluListener);
  }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 2
      }
    ];
    // Detectar el cambio de pantalla al inicializar el componente
    this.detectarCambioPantalla();
  }

  detectarCambioPantalla() {
    this.pantallaPequena = this.pantallaCelu.matches;
    if (this.pantallaPequena) {
      this.sectionName = 'carrousel-grid-responsive';
    } else {
      this.sectionName = 'carrousel-grid';
    }
    // Llamar a getSection después de actualizar sectionName
    this.getSection();
  }

  getSection() {
    this.sectionServices.getSection(this.sectionName).subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
            this.section = data.sectionsWebResponse.sectionsWeb[0];
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }
}