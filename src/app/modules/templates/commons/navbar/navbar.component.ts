import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ObsService } from 'src/app/modules/services/huawei/obs.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy, OnInit{

  public obsService = inject(ObsService);


  pantallaCelu: MediaQueryList;
  pantallaCeluListener: () => void;
  pantallaPequena: boolean = false;
  sidebarVisible: boolean = false;
  oculto: boolean = false;

  constructor(media: MediaMatcher) {
    this.pantallaCelu = media.matchMedia('(max-width: 768px)');
    this.pantallaCeluListener = () => {
      this.detectarCambioPantalla();
    };
    this.pantallaCelu.addEventListener('change', this.pantallaCeluListener);
  }

  ngOnInit(): void {
    this.detectarCambioPantalla();
  }  
  
  detectarCambioPantalla() {
    this.pantallaPequena = this.pantallaCelu.matches;
  }

  ngOnDestroy() {
    this.pantallaCelu.removeEventListener('change', this.pantallaCeluListener);
  }

  //Control de Scroll para visibilidad de Navbar
  scrollYPos = 0;
  lastScrollYPos = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.scrollYPos = window.scrollY;
    if (this.scrollYPos > this.lastScrollYPos) {
      this.oculto = true; //Scroll hacia abajo
    } else {
     this.oculto = false; //Scroll hacia arriba
    }
    this.lastScrollYPos = this.scrollYPos;
  }
}