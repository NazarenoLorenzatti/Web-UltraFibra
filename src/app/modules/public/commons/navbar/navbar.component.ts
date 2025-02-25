import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MediaQueryService } from 'src/app/modules/services/media-query/media-query.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy, OnInit {

  public isSmallScreen: boolean = false;
  public sidebarVisible: boolean = false;
  public hidden: boolean = false;
  private isSafari: boolean = false;
  private subscription!: Subscription;
  private mediaQueryService = inject(MediaQueryService)

  constructor() {
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  ngOnInit(): void {
    this.subscription = this.mediaQueryService.pantallaPequena$.subscribe(
      (isSmallScreen) => {
        this.isSmallScreen = isSmallScreen;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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