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
  private media = inject(MediaMatcher)
  private parallaxFactor: number = 0.5;
  private movileScreen: MediaQueryList;

  public isSmallScreen: boolean = false;
  public section: any;
  public backgroundImageUrl!: string;
  movileScreenListener: () => void;

  constructor() {
    this.movileScreen = this.media.matchMedia('(max-width: 990px)');
    this.movileScreenListener = () => this.changeScreenDetected();
    this.movileScreen.addEventListener('change', this.movileScreenListener);
    this.changeScreenDetected();
  }

  ngOnInit(): void {
    this.getSection();
    this.setParallaxElements();
  }

  setParallaxElements() {
    window.addEventListener('scroll', () => {
      let scrollPosition = window.pageYOffset;
      let parallaxElements = document.querySelectorAll('.parallax-section');
      parallaxElements.forEach((element: Element) => {
        let distanceFromTop = (element as HTMLElement).offsetTop;
        let parallaxFactor = this.parallaxFactor;

        (element as HTMLElement).style.backgroundPositionY = (distanceFromTop - scrollPosition) * parallaxFactor + 'px';
      });
    });
  }

  getSection() {
    this.sectionServices.getSection('banner-cineplus').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
            this.section = data.sectionsWebResponse.sectionsWeb[0];
            this.updateBackgroundImg();
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  changeScreenDetected() {
    this.isSmallScreen = this.movileScreen.matches;
    this.updateBackgroundImg();
  }

  updateBackgroundImg() {
    if (this.section) {
      if (this.isSmallScreen) {
        this.backgroundImageUrl = this.section.imgs[1].urlObs;
        this.parallaxFactor = 1;
      } else {
        this.backgroundImageUrl = this.section.imgs[0].urlObs;
        this.parallaxFactor = 0.5;
      }
    }
  }

  ngOnDestroy() {
    this.movileScreen.removeEventListener('change', this.movileScreenListener);
  }
}
