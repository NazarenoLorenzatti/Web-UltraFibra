import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from 'src/app/modules/services/animations/animation.service';
import { ParallaxService } from 'src/app/modules/services/parallax/parallax.service';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-sections-template',
  templateUrl: './sections-template.component.html',
  styleUrls: ['./sections-template.component.css']
})
export class SectionsTemplateComponent implements OnInit, OnDestroy {

  private parallaxService = inject(ParallaxService);
  private animationService = inject(AnimationService);
  public img!: string;
  private sectionServices = inject(SectionService);
  private router = inject(Router);

  @Input() isRight: boolean = false;
  @Input() text: string = "tittle";
  @Input() sectionImage: string = 'products-homelike';
  @Input() textButton: string = "Ir a Algo";
  @Input() colorButton: number = 0;
  @Input() urlNav: string = "#";

  ngOnInit(): void {
    this.parallaxService.setParallax('parallax-section', 0);
    this.animationService.setAnimation('tracking-element', 'slide-in-blurred-bottom', 0.8);
    this.getSectionImg();
  }

  ngOnDestroy(): void {
    this.parallaxService.clearParallax();
  }

  goTo(nav: string) {
    this.router.navigate([nav]);
  }

  getSectionImg() {
    this.sectionServices.getSection(this.sectionImage).subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
            this.img = data.sectionsWebResponse.sectionsWeb[0].imgs[0]?.urlObs;
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }
}