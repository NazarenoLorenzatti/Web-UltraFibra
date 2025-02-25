import { Component, inject, OnInit } from '@angular/core';
import { AnimationService } from 'src/app/modules/services/animations/animation.service';
import { ParallaxService } from 'src/app/modules/services/parallax/parallax.service';

@Component({
  selector: 'app-section-plans-pymes',
  templateUrl: './section-plans.component.html',
  styleUrls: ['./section-plans.component.css']
})
export class SectionPlansPymesComponent implements OnInit {

  private parallaxService = inject(ParallaxService);
  private animationService = inject(AnimationService);

  ngOnInit(): void {
    this.parallaxService.setParallax('parallax-section', 0);
    this.animationService.setAnimation('tracking-element', 'slide-in-blurred-bottom', 0.5);
  }

  ngOnDestroy(): void {
    this.parallaxService.clearParallax();
  }
}
