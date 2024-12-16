import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

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
  private router = inject(Router);

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

  navigate(url: string){
    this.router.navigate([url]);
  }


}
