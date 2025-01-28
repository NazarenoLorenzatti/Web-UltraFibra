import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnimationService } from 'src/app/modules/services/animations/animation.service';
import { MediaQueryService } from 'src/app/modules/services/media-query/media-query.service';
import { ParallaxService } from 'src/app/modules/services/parallax/parallax.service';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-banner-cineplus',
  templateUrl: './banner-cineplus.component.html',
  styleUrls: ['./banner-cineplus.component.css']
})
export class BannerCineplusComponent implements OnInit, OnDestroy {
  private sectionServices = inject(SectionService)
  private parallaxService = inject(ParallaxService);
  private animationService = inject(AnimationService);
  private subscription!: Subscription;
  private mediaQueryService = inject(MediaQueryService)
  public isSmallScreen: boolean = false;
  public backgroundImageUrl!: string;

  ngOnInit(): void {
    this.parallaxService.setParallax('parallax-section', 0);    
    this.animationService.setAnimation('tracking-element', 'tracking-in-expand-fwd', 0.5);    
    this.subscription = this.mediaQueryService.pantallaPequena$.subscribe(
      (isSmallScreen) => {
        this.isSmallScreen = isSmallScreen;
      }
    );

    this.getSection();
  }

  getSection() {
    this.sectionServices.getSection('banner-cineplus').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
            if(this.isSmallScreen){
              this.backgroundImageUrl = data.sectionsWebResponse.sectionsWeb[0].imgs[1].urlObs;           
            } else{
              this.backgroundImageUrl = data.sectionsWebResponse.sectionsWeb[0].imgs[0].urlObs;
            }           
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  ngOnDestroy() {    
    this.parallaxService.clearParallax();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
