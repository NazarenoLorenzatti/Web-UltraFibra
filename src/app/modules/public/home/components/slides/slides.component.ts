import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

export interface routesImages{
  route: string;
}
@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnDestroy, OnInit {

  pantallaCelu: MediaQueryList;
  pantallaCeluListener: () => void;
  pantallaPequena: boolean = false;
  listImages:  routesImages[];
  responsiveOptions!: any[];

  constructor(media: MediaMatcher) {
    this.pantallaCelu = media.matchMedia('(max-width: 768px)');
    this.pantallaCeluListener = () => {
      this.detectarCambioPantalla();
    };
    this.pantallaCelu.addEventListener('change', this.pantallaCeluListener);

    const img1: routesImages = { route: "hogar.jpg"};
    const img2: routesImages = { route: "corpo.jpg"};
    const img3: routesImages = { route: "escuelas.jpg"};
    const img4: routesImages = { route: "central-de-monitoreo.jpg"};

    this.listImages = [img1,img2,img3,img4];
  }

  detectarCambioPantalla() {
    this.pantallaPequena = this.pantallaCelu.matches;
  }

  ngOnDestroy() {
    this.pantallaCelu.removeEventListener('change', this.pantallaCeluListener);
  }

  ngOnInit() {
    this.detectarCambioPantalla();
    this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}
  
}
