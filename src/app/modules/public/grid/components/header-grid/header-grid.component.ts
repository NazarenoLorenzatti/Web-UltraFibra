import { Component, inject, OnInit } from '@angular/core';
import { AnimationService } from 'src/app/modules/services/animations/animation.service';
import { ParallaxService } from 'src/app/modules/services/parallax/parallax.service';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-header-grid',
  templateUrl: './header-grid.component.html',
  styleUrls: ['./header-grid.component.css']
})
export class HeaderGridComponent implements OnInit {

  private parallaxService = inject(ParallaxService);
  private animationService = inject(AnimationService);
  private sectionServices = inject(SectionService);
  public backgroundImg: any;

  ngOnInit(): void {
    this.getSection();
    this.parallaxService.setParallax('parallax-section', 0);
    this.animationService.setAnimation('tracking-element', 'bounce-in-top', 1);
  }

  getSection() {
    this.sectionServices.getSection('header-home').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
            this.backgroundImg = data.sectionsWebResponse.sectionsWeb[0].imgs[1].urlObs;
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }
}
