import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy, OnInit {

  pantallaCelu: MediaQueryList;
  pantallaCeluListener: () => void;
  pantallaPequena: boolean = false;
  sidebarVisible: boolean = false;
  oculto: boolean = false;
  private cdRef = inject(ChangeDetectorRef);
  isSafari: boolean = false;

  constructor(media: MediaMatcher) {
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    this.pantallaCelu = media.matchMedia('(max-width: 1130px)');
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

  scrollYPos = 0;
  lastScrollYPos = 0;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (!this.isSafari) { // Ejecutar solo si no es Safari
      this.scrollYPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (this.scrollYPos > this.lastScrollYPos) {
        this.oculto = true; // Scroll hacia abajo
      } else {
        this.oculto = false; // Scroll hacia arriba
      }
      this.lastScrollYPos = this.scrollYPos;
    }
  }
}