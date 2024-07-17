import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-megas',
  templateUrl: './megas.component.html',
  styleUrls: ['./megas.component.css']
})
export class MegasComponent implements OnDestroy, OnInit{

  pantallaCelu: MediaQueryList;
  pantallaCeluListener: () => void;
  pantallaPequena: boolean = false;
  activeIndex: number = 0;

  constructor(media: MediaMatcher) {
    this.pantallaCelu = media.matchMedia('(max-width: 768px)');
    this.pantallaCeluListener = () => {
      this.detectarCambioPantalla();
    };
    this.pantallaCelu.addEventListener('change', this.pantallaCeluListener);
  }
  
  ngOnInit() {
    this.detectarCambioPantalla();
  }

  detectarCambioPantalla() {
    this.pantallaPequena = this.pantallaCelu.matches;
  }

  ngOnDestroy() {
    this.pantallaCelu.removeEventListener('change', this.pantallaCeluListener);
  }


}
