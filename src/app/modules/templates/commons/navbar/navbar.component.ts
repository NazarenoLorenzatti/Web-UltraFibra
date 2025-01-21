import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy, OnInit {

  private movileScreen: MediaQueryList;
  public isSmallScreen: boolean = false;
  public sidebarVisible: boolean = false;
  public hidden: boolean = false;
  private isSafari: boolean = false;
  movileScreenListener: () => void;

  constructor(media: MediaMatcher) {
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    this.movileScreen = media.matchMedia('(max-width: 1130px)');
    this.movileScreenListener = () => {
      this.changeDetected();
    };
    this.movileScreen.addEventListener('change', this.movileScreenListener);
  }

  ngOnInit(): void {
    this.changeDetected();
  }

  changeDetected() {
    this.isSmallScreen = this.movileScreen.matches;
  }

  ngOnDestroy() {
    this.movileScreen.removeEventListener('change', this.movileScreenListener);
  }

  scrollYPos = 0;
  lastScrollYPos = 0;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (!this.isSafari) { // Ejecutar solo si no es Safari
      this.scrollYPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (this.scrollYPos > this.lastScrollYPos) {
        this.hidden = true; // Scroll hacia abajo
      } else {
        this.hidden = false; // Scroll hacia arriba
      }
      this.lastScrollYPos = this.scrollYPos;
    }
  }
}